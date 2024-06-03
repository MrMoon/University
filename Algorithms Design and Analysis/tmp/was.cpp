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
    int n;
    cin >> n;
    vector<int> a(n);
    for (auto& x: a) cin >> x;
    sort(a.begin(), a.end());
    vector<int> dp(n + 1, 0);
    dp[n - 1] = a[n - 1];
    for (int i = n - 2 ; ~i ; --i) {
        dp[i] = max(dp[i + 1], dp[next(a, i)] + a[i]);
    }
    int i = 0;
    while (i <= n) {
        if (dp[i] > dp[i + 1]) {
            cout << i << endl;
            i = next(a, i);
        } else ++i;
    }
    cout << dp[0] << endl;
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