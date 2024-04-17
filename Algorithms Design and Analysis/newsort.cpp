/*
    Going back to the essence.

    Just another day on the moon,
    Cheese not included.
*/
#include <bits/stdc++.h>
#define endl '\n'
typedef long long ll;

using namespace std;


const int N = 1 << 7 + 1; // the size is 1 << 7 + 1 (the number of ASCII bits). 

void insertionSort(vector<string>& arr, int low, int n) {
    for(int j, i = low + 1 ; i <= n ; ++i) {
        string val = arr[i] ;
        j = i;
        while (j > low and arr[j - 1] > val) {
            arr[j] = arr[j - 1];
            --j;
        }
        arr[j] = val;
    }
}

char charAt(string& str, int i) {
    return i < str.length() ? str[i] : 0;
}


const int N = 1 << 7 + 1; // the size is 1 << 7 + 1 (the number of ASCII bits). 

void insertionSort(vector<string>& arr, int low, int n) { // insertion sort from [low, n]
    for(int j, i = low + 1 ; i <= n ; ++i) {
        string val = arr[i] ;
        j = i;
        while (j > low and arr[j - 1] > val) {
            arr[j] = arr[j - 1];
            --j;
        }
        arr[j] = val;
    }
}

char charAt(string& str, int i) {
    return i < str.length() ? str[i] : 0;
}

// to sort a string array s of size n, we can sort the string values in s s[i] based on the jth character.
// divide and conquer.
void go(vector<string>& s, int currentCharacterIdx, int mx, int idx, int buketSize) {
    if (currentCharacterIdx > mx or idx >= buketSize) // base case: no more characters.
        return;

    if (buketSize <= 25) { // For buckets that reach size 25 or less, the recursion should stop and leave the bucket unsorted.
        insertionSort(s, idx, buketSize);
        return;
    }

    vector<string> bucket[N]={}; // buckets of strings to hold the values of string and sort them based on their arragment in the array.

    for (int i = idx ; i <= buketSize ; ++i) {
        bucket[charAt(s[i], currentCharacterIdx)].push_back(s[i]); // adding strings based on the currentCharacterIdx.
        mx = max(mx, (int) s[i].size()); // calculating the maximum length of a string.
    }

    int j = idx;
    for (auto x : bucket) {
        if (x.size()) {
            go(x, currentCharacterIdx + 1, mx, idx, x.size() - 1); // recursion to call the next call and sort the rest of the bucket.
            for (string p: x) {
                s[j++] = p; // add the strings in their place.
            }
        }
    }
}

void solve() {
    string s[] = {"NJ", "TX", "ME", "AK", "NY", "AZ", "MD", "AL", "MA", "NJ", "TX", "ME", "AK", "NY", "AZ", "MD", "AL", "MA", "NJ", "TX", "ME", "AK", "NY", "AZ", "MD", "AL", "MA", "NJ", "TX", "ME", "AK", "NY", "AZ", "MD", "AL", "MA"};
    vector<string> p = {"6","2","4","8","9","5","1","0", "3","7"};

    int n = (int) p.size();
    go(p, 0, 0, 0, n - 1);
    // for(int j, i = 0 ; i < n ; ++i) {
    //     string val = s[i] ;
    //     j = i;
    //     while (j > 0 and s[j - 1] > val) {
    //         s[j] = s[j - 1];
    //         --j;
    //     }
    //     s[j] = val;
    // }
    for (auto x : p) {
        cout << x << endl;
    }
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
    //scanf("%d",&T);
    while(T--) solve();

    #ifdef ONLINEJUDGE
     fprintf(stderr, "\n>> Runtime: %.10fs\n", (double) (clock() - tStart) / CLOCKS_PER_SEC);
    #endif
    return 0;
}