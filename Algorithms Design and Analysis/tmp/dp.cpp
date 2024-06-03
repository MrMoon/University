#include <iostream>

using namespace std;

int main() {
	int n;
	cin >> n;
	vector<int> a(n);
	for (auto& x: n) cin >> x;
	vector<int> dp(n + 1, INT_MIN);
	for (int x, i = 1 ; i <= n ; ++i) {
		x = INT_MIN;
		for (int j = 1 ; j <= i ; ++j) 
			x = max(x, a[i] + dp[j - i]);
		dp[i] = x;
	}
	cout << dp[n] << endl;
	return 0;
}
