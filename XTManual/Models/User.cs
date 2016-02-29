using System;
using SQLite.Net.Attributes;

namespace XTManual.Models
{
	public class User
	{
		[PrimaryKey, AutoIncrement]
		public int ID { get; set; }
		public string Email { get; set; }
		public string Name { get; set; }
		public string Phone { get; set; }
		public DateTime CreatedOn { get; set; }
	}
}