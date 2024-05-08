/*
    Going back to the essence.

    Just another day on the moon,
    Cheese not included.
*/
#include <bits/stdc++.h>
#define endl '\n'
typedef long long ll;

using namespace std;

const int N = (int) 1e6 + 20;
int dpFib[N], dpMib[N];

int fib(int n);
int mib(int n);

int fib(int n) {
    if (n <= 0)
        return 0;

    if (n == 1)
        return 1;

    if (dpFib[n] != -1)
        return dpFib[n];

    dpFib[n] = n - mib(fib(n - 1) + fib(n - 2));
    return dpFib[n];
}

int mib(int n) {
    if (n <= 1)
        return 0;

    if (dpMib[n] != -1) 
        return dpMib[n];

    dpMib[n] = n - fib(mib(n - 1));
    return dpMib[n];
}

void solve() {
    int n;
    cin >> n;

    for (int i = 0 ; i < N ; ++i) dpFib[i] = -1;
    for (int i = 0 ; i < N ; ++i) dpMib[i] = -1;

    puts("----------ANS----------");
    cout << "Fib = " << fib(n) << endl;
    cout << "Mib = " << mib(n) << endl;
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