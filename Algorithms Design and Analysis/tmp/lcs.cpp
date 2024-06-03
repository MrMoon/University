/*
    Going back to the essence.

    Just another day on the moon,
    Cheese not included.
*/
#include <bits/stdc++.h>
#define endl '\n'
typedef long long ll;

using namespace std;

void solve() {
    string s, p;
    cin >> s >> p;
    const int N = (int) s.size();
    const int M = (int) p.size();
    int dp[N + 1][M + 1];
    for (int i = 0 ; i <= N ; ++i) dp[i][0] = 0;
    for (int i = 0 ; i <= M ; ++i) dp[0][i] = 0;
    for (int i = 1 ; i <= N ; ++i) {
        for (int j = 1 ; j <= M ; ++j) {
            if (s[i] == p[i])
                dp[i][j] = 1 + dp[i - 1][j - 1];
            else
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    int i = N, j = M;
    while(i > 0 and j > 0) {
        if (s[i] == p[i]) {
            cout << s[i] << endl;
            --i;
            --j;
        } else if (dp[i - 1][j] >= dp[][j - 1]) --i;
        else --j;
    }
    cout << dp[N][M] << endl;
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