using System;
using System.Linq;
using Xamarin.Forms;
using XTManual.Infrastructure;
using XTManual.Models;
using System.Diagnostics;

namespace XTManual
{
	public class App : Application
	{
		public static User _mainUser;

		public App ()
		{
			try {
				UserAccess userAccess = new UserAccess();
				_mainUser = userAccess.GetUserList().FirstOrDefault();

				if(_mainUser != null)
				{
					MainPage = new NavigationPage(new Login()) { BarBackgroundColor = Color.Blue, BarTextColor = Color.White };
				}
				else
				{
					// The root page of your application
					MainPage = new NavigationPage(new Login()) { BarBackgroundColor = Color.Blue, BarTextColor = Color.White };
				}
			} catch (Exception ex) {
				Debug.WriteLine (ex);
			}
		}

		protected override void OnStart ()
		{
			// Handle when your app starts
		}

		protected override void OnSleep ()
		{
			// Handle when your app sleeps
		}

		protected override void OnResume ()
		{
			// Handle when your app resumes
		}
	}
}

