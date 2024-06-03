#include <iostream>

using namespace std;

int main() {
	int n, cap;
	cin >> n >> cap;
	vector<int> v(n), w(n);
	for (int i = 0 ; i < n ; ++i) cin >> v[i] >> w[i];
	int dp[n + 1][cap + 1];
	for (int i = 0 ; i <= n ; ++i) dp[i][0] = 0;
	for (int i = 0 ; i <= cap ; ++i) dp[0][i] = 0;
	for (int i = 1 ; i <= n ; ++i) {
		for (int x, y, currentCap = 0 ; currentCap <= cap ; ++currentCap) {
			x = dp[i - 1][currentCap];
			y = 0;
			if (currentCap - w[i] >= 0)
				y = dp[i - 1][currentCap - w[i]] + v[i];
			dp[i][j] = max(x, y);
		}
	}
	int i = n, j = cap;
	while (
	return 0;
}
