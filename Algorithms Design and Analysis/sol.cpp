/*
    Going back to the essence.

    Just another day on the moon,
    Cheese not included.
*/
#include <bits/stdc++.h>
#define endl "\n"
typedef long long ll;

using namespace std;

string element(string s[], string p[], const int& i, const int& n) { return (i < n) ? s[i] : p[i - n];}

void swapT(string s[], string p[], const int& i, const int& j, const int& n) {
    if (i < n and j < n) swap(s[i], s[j]);
    else if (i < n and j >= n) swap(s[i], p[j - n]);
    else if (i >= n and j < n) swap(p[i - n], s[j]);
    else swap(p[i - n], p[j - n]);
}

int partition(string s[], string p[], const int& first, const int& last, const int& n) {
    string pivot = element(s, p, first, n);
    int i = first + 1, j = last;
    
    while (true) {
        while (i < last and element(s, p, i, n).compare(pivot) < 0) ++i;
        while (j > first and element(s, p, j, n).compare(pivot) > 0) --j;

        if (i >= j) 
            break;

        swapT(s, p, i, j, n);
    }

    swapT(s, p, first, j, n);
    return j;
}

string quickselect(string s[], string p[], int first, int last, int N) {
    if (first >= last)
        return element(s, p, first, N);
    puts("-----------------------");
    cout << "Start: " << first << "\tEnd: " << last << endl;
    int pivot = partition(s, p, first, last, N);
    cout << "Pivot: " << pivot << endl;

    return ((last - pivot) & 1) ? quickselect(s, p, pivot + 1, last, N) : quickselect(s, p, first, pivot - 1, N);
}

void solve() {
    int n;
    cin >> n;
    string s[n], p[n - 1];
    for (int i = 0 ; i < n ; ++i) cin >> s[i];
    for (int i = 0 ; i < n - 1 ; ++i) cin >> p[i];

    string tmp = quickselect(s, p, 0, n + n - 2, n);
    cout << tmp << endl;
    for (int i = 0 ; i < n ; ++i) {
        cout << s[i] << ' ';
    }
    puts("");
    for (int i = 0 ; i < n - 1 ; ++i) {
        cout << p[i] << ' ';
    }
    puts("\n");
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