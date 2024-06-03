#include <list>
#include <queue>
#include <iostream>
using namespace std;

#define WHITE 1
#define GRAY  2
#define BLACK 3

template <class T>
void print_array(string label, T arr[], int size);


// A directed graph represented as an adjacency list
class Graph { 
public:
	Graph(int V);
	~Graph();
	void add_edge(int u, int w);
	void traverse_all();
	void BFT(int v);
	bool has_edge(int u, int w);
	Graph* complement();
	void print();

private:
	int V;    // No. of vertices 
	list<int> *adj; 

	void DFT(int color[], int parent[], int d[], 
		     int f[],     int& time,    int u);
};

Graph::Graph(int V)	
{ 
    this->V = V; 
    adj = new list<int>[V]; 
    // adj[i] has a list of vertices adjacent to i
    // i.e. there is an edge in the graph from i
    // to that vertex.
} 

Graph::~Graph() { delete [] adj; }  


// This function assumes that the graph is directed
void Graph::add_edge(int u, int w) 
{
	// disallow parallel edges
	if (has_edge(u, w))
		return;

    adj[u].push_back(w);
	// if the graph is undirected,
	// add the following statement:
	// adj[w].push_back(u) 
}


bool Graph::has_edge(int u, int w)
{
	for (int v : adj[u])
		if (v == w) 
			return true;
	return false;
}

void Graph::print()
{
	for (int v = 0 ; v < V ; v++) {
		cout << "[" << v << "]: ";
		for (int w : adj[v])
			cout << w << ", ";
		cout << endl;
	}
}

// The complement of a graph G is a graph GC
// with the same vertices, but for every edge
// e that is not in G, e is an edge in GC, and
// every edge that is in GC is not in G.
Graph* Graph::complement()
{
	Graph* gc = new Graph(V);
	
	for (int u = 0; u < V; u++)
		for (int w = 0; w < V; w++)
		if (!has_edge(u, w) && (u != w))
			gc->add_edge(u, w);
	return gc;

}
 
// Traverses the graph level-by-level.
// computes the shortest path in an unweighted graph.
// Running time = O(E+V)
// 		Best Case = Theta(V)
//		The code always does Theta(V) work to initialize
//		the arrays.
//
//		Worst Case = Theta(V^2)
//		This happens if the graph is connected
//      and is complete. In this case, every
//      vertex attempts to add every other vertex.
void Graph::BFT(int source){	
	bool* marked = new bool[V];
	int* parent  = new int[V];
	int* dist    = new int[V]; //distance

	for (int u = 0; u < V; u++){
		marked[u] = false;  
		parent[u] = -1;
		dist[u]   = INT_MAX;
	}

	marked[source] = true; 
	dist[source]   = 0;

	queue<int> q; 
	q.push(source);

	while(!q.empty()){
		int v = q.front();
		q.pop();

		for (int w : adj[v]) {
			if (!marked[w]){
				marked[w] = true;
				dist[w]   = dist[v] + 1;
				parent[w] = v;
				q.push(w);
			}
		}
	}
	// The above loop repeats at most
	// deg(0) + deg(1) deg(2) + ... + deg(V-1)
	// = E times.

	print_array("Marked: ", marked, V);
	print_array("Parent: ", parent, V);
	print_array("Dist  : ", dist, V);

	delete [] marked;
	delete [] parent;
	delete [] dist;
}

// This function uses DFS to traverse all the vertices
// that are in the graph, regardless of whether the
// graph is connected or not.
//
// Running Time = Theta(E + V)
// All edges and vertices must be seen.
//
// If E = 0, the running time becomes 
// Theta(V + 0) = Theta(V) because all the 
// vertices will be seen.
// 
// If E = Theta(V^2), the running time becomes 
// Theta(V^2+V) = Theta(V^2) = Theta(E)
void Graph::traverse_all(){
	int* color  	= new int[V];
	int* parent 	= new int[V];
	int* discovery 	= new int[V];
	int* finish 	= new int[V];
	int time 		= 0;

	for (int u = 0; u < V; u++){
			color[u] 	= WHITE;  
			parent[u] 	= -1;
			finish[u]	= INT_MIN;
			discovery[u]= INT_MIN;
	}

	// For every vertex: If the vertex is seen for the
	// first time, start a new DFS from there.
	for (int u = 0; u < V; u++) {
		if (color[u] == WHITE) {
			cout << "DFT From: " << u << endl;
			DFT(color, parent, discovery, finish, time, u);
		}
	}

	cout << "Done" << endl << endl;
	print_array("Color         : ", color, V);
	print_array("Parent        : ", parent, V);
	print_array("Discovery Time: ", discovery, V);
	print_array("Finish Time   : ", finish, V);

	delete [] color;
	delete [] parent;
	delete [] discovery;
	delete [] finish;
 }

void Graph::DFT(int color[],  int parent[], int discovery[], 
				int finish[], int& time,    int source){
	++time;
	discovery[source]= time;
	color[source] 	 = GRAY;

	for (int v : adj[source]) {
		if (color[v] == WHITE){	
			parent[v]= source;
			DFT(color, parent, discovery, finish, time, v);
		}
	}

	++time;
	finish[source] = time;
	color[source]  = BLACK;
}

// To check if there is a cycle in an undirected graph:
// Perform BFS or DFS and return true if a vertex is seen twice
// (unless the seen vertex is the parent of the current vertex):
// 		for (int w : adj[v]) {
//			if (!marked[w]){
//				marked[w] = true;
//				q.push(w);
//			} else if (parent[w] != v)
//				report a cycle!
//		}
//

// To check if there is a cycle in a directed graph:
// Perform DFS and return true if a vertex sees a
// GRAY vertex (BackEdge).

// To check if an undirected graph is connected:
// Run DFS or BFS and then see if all the vertices
// are marked/visited.

// To count the number of connected components in an
// undirected graph:
// increment a counter in the place of the statement
// cout << "DFT from" in the traverse_all function.


int main() { 
	// build a random graph
    Graph g(10);
    for (int i = 0; i < 15; i++) {
    	int from, to;

    	do {
    		from = rand() % 10;
    		to = rand() % 10;
    	} while (from == to || g.has_edge(from, to));

    	g.add_edge(from, to);
    }

	cout << "Graph: " << endl;
	g.print();

	cout << endl << "BFT: " << endl;
	g.BFT(0);

	cout << endl << "Start a DFT from every component: " << endl;
	g.traverse_all();

	return 0;	
}




template <class T>
void print_array(string label, T arr[], int size)
{
	cout << label << " [";
	for (int w = 0; w < size; w++) {
		cout << arr[w];
		if (w != size-1)
			cout << ", ";
	}
	cout << "]" << endl;
}