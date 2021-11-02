#include <iostream>
#include <vector>
#include <time>
#include <random>

using namespace std;

class InitialPopulation {
	private:
		const int K;
		const int MIN = -5;
		const int MAX = 5;
		double getRandom(const int min, const int max);
	public:
		vector< vector<double> > init();
};

InitialPopulation::InitialPopulation(const int INITIAL_POPULATION_SIZE): K(INITIAL_POPULATION_SIZE) {
}

vector< vector<double> > InitialPopulation::init() {
	vector< vector<double> > population;
	
	for (double &chromosom: population) 
		for (double &gene: chromosom)
			g = getRandom(-5, 5);

	return population;
}
 
double InitialPopulation(const int min, const int max) {
	static bool isFirstGen = true;
	if (isFirstGen) {
		srand( time(NULL) );
		isFristGen = false;
	}

	return min + rand() % ((max + 1) - min);
}
