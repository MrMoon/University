#include <list>
#include <stack>
#include <vector>
#include <iostream>
using namespace std;

// A topological ordering of the vertices in a
// directed graph is an ordering where for every 
// directed edge from vertex u to vertex v, u 
// comes before v in the ordering.
//
// Ex. In dependency graph capturing prerequisite
// relationships between university courses, an
// edge from course A to course B means that A
// is a prerequisite of B. A topological order
// of the courses gives a valid plan, where
// no course is taken before its prerequisite.
// 
// Note. There can be multiple topological 
// orders for a graph.
//
// Note. A graph has a topological if and only
// if it is a DAG (directed acyclic graph).

const int WHITE = 0;
const int  GRAY = 1;
const int BLACK = 2;

class Graph { 
public:
	Graph(int V);
	~Graph();
	void add_edge(int u, int w);
	vector<int> topological_order();
	bool has_edge(int u, int w);

private:
	int V;    // No. of vertices 
	list<int> *adj; 

	void DFT(int v, int color[], stack<int>& s);
};

// Prints the vertices of the graph in
// topological order.
// Throws an exception if the graph is not a DAG.
//
// ALGORITHM. Perform DFT and report the vertices 
// in "reverse finish time" order.
//
// The running time of the algorithm is 
// Theta(V+E)
vector<int> Graph::topological_order(){
	int* color = new int[V];
	for (int v = 0; v < V; v++)
		color[v] = WHITE;  

	stack<int> s;
	for (int v = 0; v < V; v++) {
		if (color[v] == WHITE)
			DFT(v, color, s);
	}

	vector<int> result;
	while (!s.empty()) {
		result.push_back(s.top());
		s.pop();
	}

	delete [] color;
	return result;
 }

void Graph::DFT(int v, int color[], stack<int>& s) {
	color[v] = GRAY;

	for (int w : adj[v]) {
		if (color[w] == WHITE)
			DFT(w, color, s);
		else if (color[w] == GRAY)
			throw string("ERROR: NO TOPOLOGICAL ORDER: GRAPH IS NOT A DAG!");
	}

	color[v] = BLACK;
	s.push(v); // store the finished vertex
}


Graph::Graph(int V)	
{ 
    this->V = V; 
    adj = new list<int>[V]; 
} 

Graph::~Graph() { delete [] adj; }  


void Graph::add_edge(int u, int w) 
{
	if (has_edge(u, w))
		return;
    adj[u].push_back(w);
}


bool Graph::has_edge(int u, int w)
{
	for (int v : adj[u])
		if (v == w) 
			return true;
	return false;
}


int main() {
	string courses[] = {
		"Structured Programming",		// 0
		"Discrete Math 1",				// 1
		"Discrete Math 2",				// 2
		"Object Oriented Programming",	// 3
		"Data Structures",				// 4
		"Web Design",					// 5
		"Algorithms",					// 6
		"Operating Systems",			// 7
		"Parallel Algorithms",			// 8
	};
    Graph g(9);
    g.add_edge(0, 3);	// Structured -> OOP
    g.add_edge(1, 2);	// DM1 -> DM2
    g.add_edge(1, 4);   // DM1 -> Data Structures
    g.add_edge(3, 4);   // OOP -> Data Structures
    g.add_edge(4, 6);   // Data Structures -> Algorithms
    g.add_edge(2, 6);   // DM2 -> Algorithms
    g.add_edge(3, 5);   // OOP -> Web
    g.add_edge(4, 7);   // Data Structures -> OS
    g.add_edge(6, 8);   // Algorithms -> Parallel
    g.add_edge(7, 8);   // OS -> Parallel

    vector<int> result = g.topological_order();
    for (int i = 0; i < result.size(); i++)
    	cout << courses[result[i]] << endl;

	return 0;	
}