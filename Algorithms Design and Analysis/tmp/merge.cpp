#include <iostream>

using namespace std;

int merge(vector<int>& a, int first, int mid, int last) {
	int i = first, j = mid + 1, k = 0;
	vector<int> tmp(last - first + 1);
	int counter = 0;
	while (i <= mid and j <= last) {
		if (a[i] <= a[j]) {
			tmp[k++] = a[i];
			++i;
		} else {
			tmp[k++] = a[j];
			++j;
			counter += (mid - i + 1);
		}
	}

	while (i <= mid) {
		tmp[k++] = a[i];
	}
	while (j <= last) {
		tmp[k++] = a[j];
	}
	for (int i = first ; i <= last ; ++i) {
		a[i] = tmp[i - first];
	}
	return counter;
}

int mergesort(vector<int>& a, int first, int last) {
	int counter = 0;
	if (first >= last) return counter;
	int mid = first + ((last - first) >> 1);

	counter += mergesort(a, first, mid);
	counter += mergesort(a, mid + 1, last);
	
	counter += merge(a, first, mid, last);

	return counter;
}

int main() {
	int n;
	cin >> n;
	vector<int> a(n);
	for (auto& x: a) cin >> x;
	int inv = mergesort(a, 0, n);
	cout << inv << endl;
	return 0;
}
