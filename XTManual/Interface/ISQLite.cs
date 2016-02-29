using System;
using SQLite.Net;

namespace XTManual.Interface
{
	public interface ISQLite
	{
		SQLiteConnection GetConnection();
	}
}