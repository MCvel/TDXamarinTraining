using System;
using XTManual.Interface;
using System.Threading.Tasks;

namespace XTManual
{
	public class NavigationService : INavigationService
	{
		#region INavigationService implementation

		public async Task NavigateToLogin()
		{
			await XTManual.App.Current.MainPage.Navigation.PushAsync(new Login());
		}

		public async Task NavigateToRoot()
		{
			await XTManual.App.Current.MainPage.Navigation.PushAsync(new Login());
		}

		#endregion
	}
}

