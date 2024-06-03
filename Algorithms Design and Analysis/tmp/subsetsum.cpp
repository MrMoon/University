/*
    Going back to the essence.

    Just another day on the moon,
    Cheese not included.
*/
#include <bits/stdc++.h>
#define endl '\n'
typedef long long ll;

using namespace std;

const int N = 111;
int dp[N][N];

void solve() {
    int n, sum;
    cin >> n >> sum;
    vector<int> a(n);
    for (auto& x: a) cin >> x;
    for (int i = 0 ; i <= n ; ++i) 
        for (int j = 0 ; j <= sum ; ++j)
            dp[i][j] = false;
    for (int i =  0 ; i <= n ; ++i)
        dp[i][0] = true;
    for (int i = 1 ; i <= sum ; ++i)
        dp[0][i] = false;
    dp[0][0] = true;
    for (int i = 1 ; i <= n ; ++i) {
        for (int j = 1 ; j <= sum ; ++j) {
            if (j - a[i - 1] >= 0) {
                dp[i][j] = dp[i - 1][j - a[i - 1]] or dp[i - 1][j];
            } else {
                dp[i][j] = dp[i - 1][j];
            }
        }
    }

    cout << (dp[n][sum] ? "YES" : "NO" )<< endl;
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