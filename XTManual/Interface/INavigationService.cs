using System;
using System.Threading.Tasks;

namespace XTManual.Interface
{
	public interface INavigationService
	{
		Task NavigateToLogin();
		Task NavigateToRoot();
	}
}