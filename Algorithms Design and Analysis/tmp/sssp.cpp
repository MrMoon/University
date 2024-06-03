/* ===== SINGLE-SOURCE SHORTEST PATHS ===== */
/* 
 * PROBLEM:    Find the shortest path from a given
 *             source vertex to every reachable
 *             vertex in the graph.
 *
 * ALGORITHM:  Dijkstra's algorithm. Works on
 *             graphs with positive edge weights
 *             only.
 *
 *             The main idea is to process the 
 *             vertices based on their distance
 *             from the source, where processing
 *             a vertex means relaxing all the
 *             leaving edges, if possible.
 *
 * COMPLEXITY: See the analysis below the implementation.
 */


sssp(source):
    define d[V] = {INFINITY} // d[v] = distance from v to source
    define p[V] = {-1}       // parent array, stores the shortest 
                             // paths tree

    PQ pq   // a min-priority queue storing vertices ordered
            // by their distance from the source

    d[source] = 0;
    for (int i = 0; i < V; i++)
        pq.insert(i)

    while (!pq.is_empty()):
        int v = pq.delMin()

        for (int w : adj[v]):
            // relax edge v -> w            
            if (d[v] + weight(v, w) < d[w]):
                d[w] = d[v] + weight(v, w)
                p[w] = v
                pq.update(w)


/* ANALYSIS:
 *
 * The running time depends on the implementation of the priority
 * queue used. Let INSERT be the insertion time, UPDATE be the update
 * time, and DELETE be the time to delete the minim. The total time is:
 * 
 *           V*INSERT + V*DELETE + E*UPDATE
 *
 * Data Structure | Running Time                    | Sparse | Dense
 * ---------------+---------------------------------+--------+--------
 *           Heap | VlogV + VlogV + ElogV = O(ElogV)| VlogV  | V^2logV
 * ---------------+---------------------------------+--------+--------
 *   Sorted Array | V^2 + V + EV          = O(EV)   | V^2    | V^3
 * ---------------+---------------------------------+--------+--------
 *          Array | V + V^2 + E           = O(V^2)  | V^2    | V^2
 * ---------------+---------------------------------+--------+--------
 *
 * WINNER: Heap for sparse graphs
 *         Unsorted array for dense graphs
 */