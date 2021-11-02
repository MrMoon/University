#include <iostream>
#include <vector>

using namespace std;

class Encode {
	private:
		const int SIZE;
		vector<double> encoded;
	public:
		double getEntry(const int idx);
		double getEntryFrom2D(const int row, const int col);
};

Encode::Encode(const vector< vector<double> >& approximation): SIZE((int) approximation.size()) {

	encoded.resize(SIZE * SIZE);

	for (auto row: approximation) 
		for (auto entry : row)
			encoded[idx++] = entry;

}

double Encode::getEntryFrom2D(const int row, const int column) {
	return encoded[row * SIZE + column];
}

double Encode::getEntry(const int idx) {
	return encoded[idx];
}
