using System;
using SQLite.Net;
using System.Collections.Generic;
using Xamarin.Forms;
using XTManual.Models;
using XTManual.Interface;
using System.Linq;

namespace XTManual.Infrastructure
{
	public class UserAccess
	{
		private SQLiteConnection _connection;

		public UserAccess()
		{
			_connection = DependencyService.Get<ISQLite> ().GetConnection ();
			_connection.CreateTable<User> ();
		}

		public IEnumerable<User> GetUserList()
		{
			return (from t in _connection.Table<User>()
				select t).ToList ();
		}

		public User GetUser(int id)
		{
			return _connection.Table<User>().FirstOrDefault(t => t.ID == id);
		}

		public void DeleteUser(int id) {
			_connection.Delete<User>(id);
		}

		public void AddUser(User _user)
		{
			User person = new User
			{
				Email = _user.Email,
				Name = _user.Name,
				CreatedOn = DateTime.Now
			};

			_connection.Insert (_user);
		}
	}
}

