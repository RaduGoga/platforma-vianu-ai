---
code: S15
duration: ~2 weeks
---

# @intro
This part of AI has no training data. You have a start state, a goal, and some allowed moves. The question is how you reach the goal efficiently. It's algorithmic, almost like a programming contest, and it shows up in puzzle, planning and game problems. You solve it with data structures, not with models.

## State space: the common language
Take a small maze, 3 by 3 squares. S is the start, G is the goal, # is a wall, and a dot is a free square. You can move one square at a time, up, down, left or right, but not through walls.

```
S . #
. # .
. . G
```

Each square has coordinates (row, column), counted from 0 like Python indices. S is at (0, 0), the walls are at (0, 2) and (1, 1), and G is at (2, 2). The square you're on right now is your state: a state is everything you need to know about the situation to carry on from there.

Every search problem is described the same way: a start state, a set of actions that lead from one state to another, a goal test that says whether you've arrived, and optionally a cost on each move. A maze: the state is your position, the actions are the steps in the four directions, the goal is the exit. In our maze, the goal test is the question "am I on G?", and each step costs 1.

All the states you can reach form a graph, where the nodes are states and the edges are moves. A graph is a set of points, called nodes, joined by lines, called edges. A subway map is a graph: the stations are the nodes, and the stretches of track between neighboring stations are the edges.

In the maze, the nodes are the 7 free squares. An edge joins two neighboring free squares: S with (0, 1), S with (1, 0), (1, 0) with (2, 0), (2, 0) with (2, 1), (2, 1) with G, and (1, 2) with G.

Search means exploring that graph cleverly, without building all of it, because it's usually enormous. Our maze has 7 states, but a Rubik's cube has more than 43 billion billion.

> [!NOTE]
> Always mark the states you've visited. Without that you go around in circles forever, revisiting the same states. In the maze: from S you go to (1, 0), from (1, 0) one move takes you back to S, from there back to (1, 0), and so on. It's the most common cause of a search that never ends.

## Uninformed search: BFS, DFS, uniform cost
Uninformed search explores blindly, with no idea where the goal is. The algorithms below differ in the order in which they pick the next state to explore, and that order comes from the structure that holds the states waiting their turn.

The first structure is the queue, like the line at the canteen: whoever got there first is served first. You add at the back and take from the front.

BFS (breadth-first search) explores level by level, using a queue. First every state one step from the start, then every state two steps away, and so on. It always finds the path with the fewest moves, but it uses a lot of memory: a whole level sits in the queue at once. If every state has 3 new moves, level 10 can have 3^10 = 59,049 states waiting.

On the maze, BFS starts with S in the queue. It takes S out and puts its free neighbors, (1, 0) and (0, 1), into the queue. This step is called expanding a state: you take it out of the queue and add its unvisited neighbors. Next comes (1, 0), which adds (2, 0). Then (0, 1), a dead end that adds nothing. Then (2, 0) adds (2, 1), and (2, 1) adds G. When G comes out of the queue, you're done.

To get the path, each square remembers the square you reached it from, called its parent. You start at G and follow the parents back: G, (2, 1), (2, 0), (1, 0), S. Reversed, that's the 4-step path. It's the shortest possible: BFS finishes every square 1 step away before it moves on to the squares 2 steps away, so the first time it reaches G, it got there by the shortest path.

In Python, the queue is a `deque` from the `collections` module, the same module you imported `Counter` from in Lesson 3. `append` adds at the back and `popleft` takes from the front. A plain list works too, but `my_list.pop(0)` shifts every other element by one position, so it gets slow on long lists.

```
from collections import deque

maze = ["S.#",
        ".#.",
        "..G"]
rows, cols = len(maze), len(maze[0])

def neighbors(pos):
    r, c = pos
    result = []
    # up, down, left, right
    for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
        nr, nc = r + dr, c + dc
        inside = 0 <= nr < rows and 0 <= nc < cols
        if inside and maze[nr][nc] != "#":
            result.append((nr, nc))
    return result

def bfs(start, goal):
    queue = deque([start])
    parent = {start: None}        # where you came from; also marks visited
    while queue:
        pos = queue.popleft()     # take from the front
        if pos == goal:
            break
        for n in neighbors(pos):
            if n not in parent:   # not visited yet
                parent[n] = pos
                queue.append(n)   # add at the back
    if goal not in parent:
        return None               # no path
    path = []
    pos = goal
    while pos is not None:        # walk back, parent by parent
        path.append(pos)
        pos = parent[pos]
    return path[::-1]             # reversed: from start to goal

print(bfs((0, 0), (2, 2)))
# [(0, 0), (1, 0), (2, 0), (2, 1), (2, 2)]
```

The function takes the maze, as a list of strings, plus the start and the goal, and returns the path as a list of coordinates. `rows` and `cols` are computed from the maze, so the same code works on any rectangular grid. `neighbors` tries the four directions and keeps only the squares inside the grid that aren't walls.

Each pair (dr, dc) says how much the row and the column change: (-1, 0) is one row up, (0, 1) one column to the right. `0 <= nr < rows` checks two things at once: that the row is at least 0 and that it's less than the number of rows. `maze[nr][nc]` first picks the string of row nr, then the character at position nc in it.

The `parent` dictionary does two jobs: it stores each square's parent, and its keys are the visited squares, so `n not in parent` means "not visited yet". `while queue:` runs as long as the queue isn't empty, because an empty queue counts as false, like an empty list (Lesson 3). `path[::-1]` reverses the list: it's the `[::2]` slice from Lesson 3, with a step of -1.

The second structure is the stack, like a pile of plates: you put plates on top and take them from the top, so the last one put down is the first one taken.

DFS (depth-first search) goes as far as it can down one path, with a stack. It uses little memory, but it may not find the shortest path and can get lost deep down. The memory stays small because it only holds the path it's on and the neighbors left for later along it, not a whole level. To see it in action, write `queue.pop()` instead of `queue.popleft()` in the code above: you always take the last state added, so the deque behaves like a stack.

On the maze, (0, 1) comes out right after S, because it went in last, and only after that dead end does (1, 0) get its turn. Here there's only one path, so DFS finds that same one. On an empty 5 by 5 grid, from one corner to the opposite one, the same version returns a winding path of 16 steps, while the shortest has 8.

Uniform cost (Dijkstra) is like BFS, but it accounts for move costs: it always expands the state with the lowest total cost so far. When moves have different costs, it finds the cheapest path, not the shortest by number of steps.

An example with costs: four towns, A, B, C and D, linked by one-way roads to keep the example short. Each road has a cost in minutes: A to B 1, A to C 4, B to C 2, B to D 5 and C to D 1. You want to get from A to D as fast as possible.

BFS looks for the path with the fewest edges, so it would return A, B, D (6 minutes) or A, C, D (5 minutes). The fastest is A, B, C, D, though: 1 + 2 + 1 = 4 minutes, even with three edges.

Uniform cost uses a priority queue. What comes out isn't whoever arrived first, but the element with the best priority, like in a hospital emergency room, where the most serious case goes in first. Here the priority is the cost: the state you reached most cheaply always comes out first.

On the towns: you start with A, at cost 0. You expand A, and B enters the queue with cost 1, C with 4. B (1) comes out, the smallest: C enters again, with 1 + 2 = 3, and D with 1 + 5 = 6. C (3) comes out, and D enters with 3 + 1 = 4. C (4) comes out, but C was already expanded along a cheaper path, so you skip it. D (4) comes out, the goal: the path A, B, C, D, 4 minutes.

You stop when the goal comes out of the queue, not when it goes in. D first went in with cost 6, but by the time its turn came, the 4-minute route had shown up.

In Python, the priority queue is the `heapq` module. `heapq.heappush(queue, x)` adds and `heapq.heappop(queue)` takes out the smallest element. When the elements are tuples, it compares them by the first number, here the cost.

```
import heapq

roads = {"A": [("B", 1), ("C", 4)],
         "B": [("C", 2), ("D", 5)],
         "C": [("D", 1)],
         "D": []}

def uniform_cost(start, goal):
    queue = [(0, start, [start])]    # (cost so far, town, path)
    done = set()                     # towns already expanded
    while queue:
        cost, town, path = heapq.heappop(queue)   # the cheapest
        if town == goal:
            return cost, path
        if town in done:
            continue                 # already reached it more cheaply
        done.add(town)
        for nxt, c in roads[town]:
            heapq.heappush(queue, (cost + c, nxt, path + [nxt]))
    return None

print(uniform_cost("A", "D"))   # (4, ['A', 'B', 'C', 'D'])
```

`roads` says, for each town, where you can go and at what cost. The queue holds tuples (cost, town, path): what it cost to get there, the town, and the path so far. The `done` set holds the towns already expanded, so the second copy of C gets skipped. `path + [nxt]` builds a new list with the next town added at the end. The function returns the lowest cost and the path.

- BFS: queue, fewest-steps path, large memory.
- DFS: stack, small memory, no shortest-path guarantee.
- Uniform cost: priority queue on cost, lowest-cost path.

## A*: informed search with a heuristic
A* (read "A star") is the star of the module. It adds a heuristic, meaning an estimate of the distance left to the goal, so it heads straight for the target instead of exploring blindly. It combines the cost already paid with the estimate of what's left to pay.

A heuristic is a quick rule of thumb for estimating. On a map, the straight-line distance to a town tells you roughly how far you still have to go, even before you know which roads you'll take.

> [!FORMULA]
> f(n) = g(n) + h(n)
> g(n) = the real cost from start to state n. h(n) = the estimate (the heuristic) from n to the goal. A* always expands the state with the lowest f.

On a grid, a natural heuristic is the Manhattan distance: how many rows plus how many columns separate you from the goal, as if there were no walls. Between (r1, c1) and (r2, c2) it's |r1 - r2| + |c1 - c2|, where |x| is the absolute value, the number without its sign. From S = (0, 0) to G = (2, 2) you get |0 - 2| + |0 - 2| = 2 + 2 = 4. The name comes from the streets of Manhattan, laid out in a grid, where you can't cut diagonally between the buildings.

A* on the maze, where every step costs 1: at S, g = 0 and h = 4, so f = 4. The neighbor (1, 0) has g = 1 and h = |1 - 2| + |0 - 2| = 3, so f = 4. The neighbor (0, 1) has g = 1 and h = |0 - 2| + |1 - 2| = 3, also f = 4. The heuristic can't see walls, so the dead end (0, 1) looks just as good to it.

Along the good path, (2, 0) has g = 2 and h = 2, (2, 1) has g = 3 and h = 1, and G has g = 4 and h = 0. f stays 4 the whole way, because here the heuristic guessed exactly how much was left.

On a grid with no walls you can see why A* heads straight for the goal. A step toward the goal raises g by 1 and lowers h by 1, so f stays the same. A step in the wrong direction raises both g and h by 1, so f goes up by 2. A* always takes out the state with the lowest f, so the wrong steps wait at the back and often never get expanded.

The code is the uniform cost code with one change: you put tuples (g + h, g, node, path) in the queue. They come out in order of f = g + h, but you keep g to compute the cost of the neighbors.

For A* to guarantee the optimal path, the heuristic has to be admissible: it must never overestimate the real distance left. If h is admissible, A* can't miss the optimal solution. If it overestimates, it may find a path, but not necessarily the shortest one.

Manhattan is admissible in the maze: every step changes the row or the column by exactly 1, so you need at least |r1 - r2| + |c1 - c2| steps, and walls can only make the path longer.

The towns show what an overestimate breaks. The real cost left to D is 4 from A, 3 from B and 1 from C. The heuristic h(A) = 3, h(B) = 2, h(C) = 1, h(D) = 0 never exceeds them, and A* finds the path A, B, C, D, 4 minutes. Now change only h(C) to 10. Once A and B are expanded, the best C in the queue has f = 3 + 10 = 13, and D has f = 6 + 0 = 6. D comes out, and A* returns A, B, D, 6 minutes. With h(C) = 1, C would have had f = 3 + 1 = 4, below 6, and A* would have gone through it.

A classic puzzle is the 8-puzzle: a 3 by 3 board with tiles numbered 1 to 8 and one empty square. Each move slides a neighboring tile into the empty square, and the goal is to put the tiles in order.

Classic heuristics for puzzles: Manhattan distance (the sum of the horizontal and vertical differences) and the number of misplaced tiles. Both never overestimate, so they're admissible.

For the 8-puzzle, Manhattan adds up, for each tile, how many rows and columns separate it from its place. It can't overestimate, because one move shifts a single tile by a single square. Neither can the count of misplaced tiles, because each of them needs at least one move. Manhattan gives larger estimates, so closer to the real cost, which is why A* usually expands fewer states with it.

## Games: minimax and alpha-beta
In two-player turn-based games (tic-tac-toe, simplified chess), you don't look for a path, you look for the best move assuming the opponent plays their best against you. That's what minimax does: you maximize the score, the opponent minimizes it, and you analyze the move tree down to some depth.

The move tree starts from the current position. One branch leaves it for each of your moves, then one branch leaves each new position for each of the opponent's replies, and so on. At the ends of the branches, called leaves, the game is over and you have a score: high is good for you, low is good for the opponent. The depth is how many moves ahead you look. If the game isn't over at that depth, you give the position an estimated score, for example the difference in pieces in chess.

A small tree: you have three moves, A, B and C, and after each one the opponent has two replies. The game ends with a score of 3 or 5 after A, 2 or 9 after B, and 1 or 7 after C.

Minimax works from the bottom up. The opponent picks the minimum in each branch: after A they leave you 3, after B 2, after C 1. You pick the maximum of those minimums, which is 3, so move A. If you went by the biggest number in the tree, you'd pick B for the 9, but the opponent would answer with the reply that gives you 2.

The tree grows explosively: every move opens up many others. In tic-tac-toe, the first move has 9 options, the second 8, the third 7, so after three moves you already have 9 · 8 · 7 = 504 branches. In chess, with about 30 possible moves at each step, four moves give you 30^4 = 810,000.

Alpha-beta pruning cuts the branches that can't change the result anyway, without losing correctness (pruning is what a gardener does when cutting branches off a tree). With it you reach deeper in the same compute time.

On the tree above: once you've worked out A, you know you can get at least 3. At B, the first leaf is 2, so the opponent can hold you to 2 or less, below 3. B is certainly worse than A, so you don't read the leaf with the 9: whatever it is, the opponent won't let you have it. At C, the first leaf is 1, and you cut the same way. You've read 4 leaves out of 6 and picked the same move, A.

The name comes from the two numbers the algorithm keeps track of: alpha, the score you've already secured (here 3), and beta, the score the opponent has already secured. Order matters: if you checked C first, then B and A, you'd cut nothing. That's why chess programs try the moves that look good first.

> [!NOTE]
> Alpha-beta gives exactly the same result as minimax, just faster. It doesn't change the chosen move, it only skips branches it has proven useless.

## CSP: constraint problems
A CSP (constraint satisfaction problem) asks for an assignment of values to some variables that respects all the rules. Coloring a map with three colors so neighbors differ, Sudoku, a timetable: all are CSPs.

A CSP has variables (what you have to choose), a domain for each variable (the values it can take) and constraints (the rules). In Sudoku, the variables are the 81 squares, and each domain is the digits 1 to 9. The constraints require different digits in every row, every column and every 3 by 3 box.

Take four regions on the map of Romania: Transylvania, Moldavia, Muntenia and Oltenia. They're the variables, and each one's domain is {red, green, blue}. The constraint: two neighboring regions get different colors. Transylvania borders the other three, Muntenia borders Moldavia and Oltenia, and Moldavia and Oltenia don't touch.

You solve them with backtracking: you assign a value, move on, and if you get stuck you go back and try something else.

On the map, you take the regions one by one and try the colors in the order red, green, blue. Transylvania gets red. Moldavia can't be red, since it borders Transylvania, so it gets green. Muntenia borders both, so blue is what's left. Oltenia can't be red (Transylvania) or blue (Muntenia), so it gets green. Moldavia and Oltenia are both green, but they don't touch, so that's allowed.

You see the backtracking happen if you try with only red and green. Transylvania is red, Moldavia green, and Muntenia, which borders both, has no color left. You go back to Moldavia, but it has no other free color either, so you go back to Transylvania and make it green. Moldavia becomes red, and Muntenia gets stuck the same way. The conclusion: there's no solution with two colors, because Transylvania, Moldavia and Muntenia all touch each other.

Without improvements, backtracking is slow. On a big map you can color dozens of regions correctly and only find out at the end that an early choice didn't work. Two techniques speed it up a lot:

- Forward checking: after each assignment, you remove from the neighbors the values that are no longer possible. You catch dead ends early.
- MRV (minimum remaining values): you always pick the variable with the fewest values left. You attack the most constrained part first, where a contradiction is more likely.

Forward checking on the map, with three colors: after Transylvania = red, you remove red from the neighbors' domains, so Moldavia, Muntenia and Oltenia are left with {green, blue}. After Moldavia = green, you remove green from Muntenia, which is left with only {blue}. With two colors, the same step would have emptied Muntenia's domain right after you colored Moldavia, so you'd know on the spot that you have to go back.

MRV then picks Muntenia, with one color left, before Oltenia, which still has two. Muntenia gets blue, Oltenia is left with only {green}, and the map is done without a single wrong try. At the start every region has three colors, so you can begin with any of them.

# @practice
- Implement A* for the 8-puzzle with two heuristics (Manhattan and misplaced tiles) and compare the number of states expanded.
- Solve a map coloring as a CSP with forward checking and MRV.
- Write minimax with alpha-beta for tic-tac-toe and check it never loses.
