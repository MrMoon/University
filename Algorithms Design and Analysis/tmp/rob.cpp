/*
    Going back to the essence.

    Just another day on the moon,
    Cheese not included.
*/
#include <bits/stdc++.h>
#define endl '\n'
typedef long long ll;

using namespace std;

int n, f, fv, k, x, y, ans;

void solve() {
    int n;
    cin >> n;
    vector<int> a(n + 1), s(n + 1);
    for (auto& x: a) cin >> x;
    vector<int> dp(n + 1, INT_MIN);
    dp[0] = 0;
    for (int x, i = 1 ; i <= n ; ++i) {
        x = INT_MIN;
        for (int j = 1 ; j <= i ; ++j) {
            x = max(x, a[i] + dp[j - i]);
            if (a[i] + dp[j - i] > x) {
                x = a[i] + dp[j - i];
                s[i] = j;
            }
        }
        dp[i] = x;
    }   
    cout << dp[n] << endl; 
}

int main() {
    // Always chasing after that full moon glow
    // Warning: May cause howling at unusual times.
    #ifdef ONLINEJUDGE
       clock_t tStart = clock();
       freopen("input.txt","r",stdin), freopen("output.txt","w",stdout);
    #endif
    
    // Speed has never killed anyone
    //ios_base::sync_with_stdio(0); cin.tie(0); cout.tie(0);
    int T = 1;
    scanf("%d",&T);
    while(T--) solve();

    #ifdef ONLINEJUDGE
     fprintf(stderr, "\n>> Runtime: %.10fs\n", (double) (clock() - tStart) / CLOCKS_PER_SEC);
    #endif
    return 0;
}