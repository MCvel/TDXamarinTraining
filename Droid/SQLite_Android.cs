using System;
using System.IO;
using System.Runtime.CompilerServices;
using XTManual.Droid;
using XTManual.Interface;

[assembly: Xamarin.Forms.Dependency(typeof(SQLite_Android))]
namespace XTManual.Droid
{
	public class SQLite_Android : ISQLite
	{
		public SQLite_Android()
		{

		}

		#region ISQLite implementation

		public SQLite.Net.SQLiteConnection GetConnection()
		{
			var fileName = "XTManual.db3";
			var documentsPath = Environment.GetFolderPath(Environment.SpecialFolder.Personal);
			var path = Path.Combine(documentsPath, fileName);

			var platform = new SQLite.Net.Platform.XamarinAndroid.SQLitePlatformAndroid();
			var connection = new SQLite.Net.SQLiteConnection(platform, path);

			return connection;
		}

		#endregion

	}
}