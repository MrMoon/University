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
const int M = 111;
int dp[N][M];

void solve() {
    int n, cap;
    cin >> n >> cap;
    vector<int> v(n), w(n);
    for (int i = 0 ; i < n ; ++i) cin >> v[i] >> w[i];
    for (int i = 0 ; i <= cap ; ++i) dp[0][i] = 0;
    for (int i = 1 ; i <= n ; ++i) {
        for (int currentCap = 0 ; currentCap <= cap ; ++currentCap) {
            int x = dp[i - 1][currentCap];
            int y = 0;
            if (currentCap - w[i] >= 0)
                y = dp[i - 1][currentCap - w[i]] + v[i];
            dp[i][currentCap] = max(x, y);
        }
    }
    puts("items taken > ");
    int i = n, j = cap;
    while(i > 0 and j > 0) {
        if (dp[i][j] > dp[i - 1][j]) {
            cout << i << ' ' << w[i] << endl;
            j -= w[i];
        }
        --i;
    }
    cout << dp[n][cap] << endl;
    puts("-----");
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