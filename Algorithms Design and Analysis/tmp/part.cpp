#include <iostream>

using namespace std;

int part(vector<int>& a, int first, int last) {
	int p = a[first], i = first, j = last + 1;
	while (true) {
		do {
			++i;
		} while (i < last and a[i] < pivot);

		do {
			--j;
		} while (j > first and a[j] > pivot);

		if (i >= j)
			break;
		swap(a[i], a[j]);
	}
	swap(a[first], a[j]);
	return j;
}

void quick(vector<int>& a, int first, int last) {
	if (first >= last)
		return;

	int p = part(a, first, last);
	quick(a, first, p);
	quick(a, p + 1, last);
}

int main() {
	int n;
	cin >> n;
	vector<int> a(n);
	for (auto& x : a) cin >> x;
	quick(a, 0, n);
	return 0;
}
