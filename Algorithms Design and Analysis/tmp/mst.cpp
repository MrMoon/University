/* 
 * PROBLEM:    Find the Minimum Spanning Tree
 *
 * ALGORITHM:  Prim's Algorithm
 *
 *             The main idea is to incrementally build
 *             the MST starting from any "source" vertex
 *             by processing the vertices based on their
 *             distance from the MST built so far.
 *
 * COMPLEXITY: Same as the analysis of Dijkstra's algorithm.
 */


mst():
    define d[V] = {INFINITY} // d[v] = distance from v to the current MST
    define p[V] = {-1}       // parent array, stores the MST

    PQ pq       // a min-priority queue storing vertices ordered
                // by their distance from the current MST

    d[0] = 0    // Assume that vertex 0 is the source. This is an arbitrary
                // choice. Any other vertex can be the source.
    for (int i = 0; i < V; i++)
        pq.insert(i)

    while (!pq.is_empty()):
        int v = pq.delMin()
        // add edge (v, parent[v]) to the MST

        for (int w : adj[v]):           
            if (weight(v, w) < d[w] and pq.contains(w)):
                d[w] = weight(v, w)
                p[w] = v
                pq.update(w)