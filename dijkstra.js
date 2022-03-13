// 1st file
var cy = cytoscape({
	container: document.getElementById('cy'),
	elements: [
		// nodes
		{ data: { id: '0', label: "Delhi" } },
		{ data: { id: '1', label: "Bangalore" } },
		{ data: { id: '2', label: "Mumbai" } },
		{ data: { id: '3', label: "Mysore" } },
		{ data: { id: '4', label: "Jaipur" } },
		{ data: { id: '5', label: "Kanpur" } },
		{ data: { id: '6', label: "Kharagpur" } },
		{ data: { id: '7', label: "Lucknow" } },
		{ data: { id: '8', label: "Bhubaneshwar" } },
		{ data: { id: '9', label: "Chennai" } },

		// edges
		{ data: { id: '01', source: '0', target: '1', weight: 11 } },
		{ data: { id: '03', source: '0', target: '3', weight: 20 } },
		{ data: { id: '04', source: '0', target: '4', weight: 7 } },
		{ data: { id: '05', source: '0', target: '5', weight: 45 } },
		{ data: { id: '07', source: '0', target: '7', weight: 75 } },

		{ data: { id: '12', source: '1', target: '2', weight: 15 } },
		{ data: { id: '13', source: '1', target: '3', weight: 17 } },
		{ data: { id: '15', source: '1', target: '5', weight: 31 } },
		{ data: { id: '16', source: '1', target: '6', weight: 50 } },

		{ data: { id: '23', source: '2', target: '3', weight: 27 } },
		{ data: { id: '26', source: '2', target: '6', weight: 70 } },
		{ data: { id: '28', source: '2', target: '8', weight: 30 } },
		{ data: { id: '29', source: '2', target: '9', weight: 17 } },
		{ data: { id: '27', source: '2', target: '7', weight: 29 } },

		{ data: { id: '73', source: '7', target: '3', weight: 47 } },
		{ data: { id: '79', source: '7', target: '9', weight: 42 } },
		{ data: { id: '71', source: '7', target: '1', weight: 24 } },
	],

	layout: {
		name: 'circle'
	},
	style: [
		{
			selector: 'node',
			style: {
				shape: 'hexagon',
				'background-color': 'blue',
				content: 'data(label)'
			}
		},

		{
			selector: 'edge',
			style: {
				'content': 'data(weight)',
				'width': 3,
				'line-color': '#cy',
				'target-arrow-color': '#ccc',
				'target-arrow-shape': '0px',
				'curve-style': 'bezier'
			}
		}
	]
});

// 2nd file
document.getElementById('again_button').addEventListener('click',()=>{
	location.reload();
});
const form = document.getElementById('src_dest');
form.addEventListener('submit', (eve) => {
	eve.preventDefault();
	var FormData_obj = new FormData(form);
	var source = FormData_obj.get('source_name');
	var destination = FormData_obj.get('destination_name');
	let source_val, destination_val;
	switch (source) {
		case "Delhi":
			source_val = 0;
			break;

		case "Bangalore":
			source_val = 1;
			break;

		case "Mumbai":
			source_val = 2;
			break;

		case "Mysore":
			source_val = 3;
			break;

		case "Jaipur":
			source_val = 4;
			break;

		case "Kanpur":
			source_val = 5;
			break;

		case "Kharagpur":
			source_val = 6;
			break;

		case "Lucknow":
			source_val = 7;
			break;

		case "Bhubaneshwar":
			source_val = 8;
			break;

		case "Chennai":
			source_val = 9;
			break;

		default:
			alert("Enter valid name!!");
			break;
	}
	switch (destination) {
		case "Delhi":
			destination_val = 0;
			break;

		case "Bangalore":
			destination_val = 1;
			break;

		case "Mumbai":
			destination_val = 2;
			break;

		case "Mysore":
			destination_val = 3;
			break;

		case "Jaipur":
			destination_val = 4;
			break;

		case "Kanpur":
			destination_val = 5;
			break;

		case "Kharagpur":
			destination_val = 6;
			break;

		case "Lucknow":
			destination_val = 7;
			break;

		case "Bhubaneshwar":
			destination_val = 8;
			break;

		case "Chennai":
			destination_val = 9;
			break;

		default:
			break;
	}
	let graph = [[0, 11, 0, 21, 7, 45, 0, 75, 0, 0],
	[11, 0, 15, 17, 0, 31, 50, 24, 0, 0],
	[0, 15, 0, 27, 0, 0, 70, 29, 30, 17],
	[20, 17, 27, 0, 0, 0, 0, 47, 0, 0],
	[7, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[45, 31, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 50, 70, 0, 0, 0, 0, 0, 0, 0,],
	[75, 24, 29, 47, 0, 0, 0, 0, 0, 42],
	[0, 0, 30, 0, 0, 0, 0, 0, 0, 0,],
	[0, 0, 17, 0, 0, 0, 0, 42, 0, 0]
	]

	dijkstra(graph, source_val, destination_val);
}, false);

// Dijkstra algorithm implementation code:
let V = 10;
let FinalPath = new Array(V);

function minDistance(dist, sptSet) {

	// Initialize min value
	let min = Number.MAX_VALUE;
	let min_index = -1;

	for (let v = 0; v < V; v++) {
		if (sptSet[v] == false && dist[v] <= min) {
			min = dist[v];
			min_index = v;
		}
	}
	return min_index;
}

function printSolution(dist) {
	console.log("Vertex \t\t Distance from Source");
	for (let i = 0; i < V; i++) {
		console.log(i + " \t\t " +
			dist[i]);
	}
}

function FindPath(destination, PathArray) {
	if (destination == -1) {
		return;
	}
	FindPath(PathArray[destination], PathArray);
	FinalPath.push(destination);
}

function dijkstra(graph, src, dest) {
	let dist = new Array(V);
	let sptSet = new Array(V);

	let parents = new Array(V);

	// Step1: Iitialise the required arrays.
	for (let i = 0; i < V; i++) {
		dist[i] = Number.MAX_VALUE;
		sptSet[i] = false;
	}

	dist[src] = 0;
	parents[src] = -1;

	// Find shortest path for all vertices
	for (let count = 0; count < V; count++) {

		// Step2: Select the vertex(u).
		console.log("count:", count, "Before passing to minDistance", dist, sptSet);
		let u = minDistance(dist, sptSet);
		console.log("u:", u);

		// Step3: Mark the selected vertex by updating it in sptSet array to true.
		sptSet[u] = true;
		console.log("After modifying sptSet", sptSet);

		// Step4: Relax the vertices from the selected vertex(u) to its neighbours.
		for (let v = 0; v < V; v++) {
			if (!sptSet[v] && graph[u][v] != 0 &&
				dist[u] != Number.MAX_VALUE &&
				dist[u] + graph[u][v] < dist[v]) {
				dist[v] = dist[u] + graph[u][v];
				parents[v] = u;
				console.log("Parents - " + parents);
			}
		}
		console.log("After second loop", dist);
		console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n");
	}
	printSolution(dist); // Function call
	FindPath(dest, parents);
	console.log("The distance is:", dist[dest], "and the path is:", FinalPath);

	console.log("Length is " + FinalPath.length);
	for (let i = 0; i < FinalPath.length - 1; i++) {
		setTimeout(() => {
			let PathStr = String(FinalPath[i]) + String(FinalPath[i + 1]);
			// console.log(PathStr, " ", typeof (PathStr));
			cy.getElementById(PathStr).style('width', '17');
			cy.getElementById(PathStr.split("").reverse().join("")).style('width', '17');
			// console.log("I got executed " + i + " times");
			document.getElementById('distance').innerHTML = dist[dest]+" km";
		}, 50);
	}

}
