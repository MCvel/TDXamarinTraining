using System;
using System.Runtime.CompilerServices;
using System.IO;
using XTManual.iOS;
using XTManual.Interface;

[assembly: Xamarin.Forms.Dependency(typeof(SQLite_iOS))]
namespace XTManual.iOS
{
	public class SQLite_iOS : ISQLite
	{
		public SQLite_iOS()
		{
		}

		#region ISQLite implementation

		public SQLite.Net.SQLiteConnection GetConnection()
		{
			var fileName = "XTManual.db3";
			var documentsPath = Environment.GetFolderPath(Environment.SpecialFolder.Personal);
			var libraryPath = Path.Combine(documentsPath, "..", "Library");
			var path = Path.Combine(libraryPath, fileName);

			var platform = new SQLite.Net.Platform.XamarinIOS.SQLitePlatformIOS();
			var connection = new SQLite.Net.SQLiteConnection(platform, path);

			return connection;
		}

		#endregion
	}
}