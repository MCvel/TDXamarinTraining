using System;
using XTManual.Interface;
using System.Windows.Input;
using Xamarin.Forms;
using System.Threading.Tasks;
using XTManual.Models;
using XTManual.Infrastructure;
using System.Diagnostics;

namespace XTManual.ViewModel
{
	public class LoginViewModel : ViewModelBase
	{
		private string _name;
		public string Name {
			get { return _name; }
			set { Notify ("Name"); }
		}

		private string _email;
		public string Email {
			get { return _email; }
			set { Notify ("Email"); }
		}

		private string _phoneNumber;
		public string PhoneNumber {
			get { return _phoneNumber; }
			set { Notify ("PhoneNumber"); }
		}

		UserAccess _userAccess = new UserAccess();

		public ICommand RegisterCommand { get; set; }

		public LoginViewModel ()
		{
			this.RegisterCommand = new Command(this.Register);
		}
			
		public void Register()
		{
			var test = RegisterUser();
		}

		public async Task<bool> RegisterUser()
		{
			var result = false;
			try {
				
				User user = new User() {
					Name = this.Name,
					Email = this.Email,
					Phone = this.PhoneNumber
				};

				_userAccess.AddUser(user); //Save Local SQLite DB
				await Task.Delay (2000); //Simulate save in server http
				result = true;

			} catch (Exception ex) {
				Debug.WriteLine (ex);
			}
			return result;
		}
	}
}

