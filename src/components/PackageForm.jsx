import { useContext } from "react";
import { GraphContext } from "../context/GraphContext";
import { MessageContext } from "../context/MessageContext";

function PackageForm() {

    const {setGraphSettings, setDependencies} = useContext(GraphContext);
    const {setMessage, setAlertColor} = useContext(MessageContext);

    function addNodesAndEdges(packages) {
        const nodes = [];
        const nodeSet = new Set();
        const edges = [];
        for (let dependency of Object.keys(packages)) {
            if (!nodeSet.has(dependency)) {
                nodes.push({id: dependency,  label: dependency, color: "#08FDD8"});
            }
            nodeSet.add(dependency);
            for (let innerDependency of packages[dependency]) {
                if (!nodeSet.has(innerDependency)) {
                    nodes.push({id: innerDependency, label: innerDependency, color: "#F6EE3F"});
                    nodeSet.add(innerDependency);
                };
                edges.push({ from: dependency, to: innerDependency});
            }
        }

        return {nodes, edges};
    }

    async function getDependencies(e) {
        e.preventDefault();

        document.activeElement.blur();

        setAlertColor("black");
        setMessage("Loading...");

        const form = e.target;
        const packageName = form[0].value;
        form[0].value = "";

        try {
            const res = await fetch("/dependencies", {
                method: 'POST',
                headers: {
                    "Content-type": 'application/json',
                },
                body: JSON.stringify({packageName: packageName})
            });
            const data = await res.json();
            if (data.errorMessage) {
                setMessage("Package Not Found");
                setAlertColor("red-500");
            } else {
                setMessage("");
    
                setDependencies(data);
                setGraphSettings(addNodesAndEdges(data));
            }
        } catch(err) {
            setMessage("Request Timed Out (try a smaller package next time)");
            setAlertColor("red-500");
        }
    }

    return (
        <form className="text-center my-4 w-72 flex flex-col items-center" onSubmit={(event) => getDependencies(event)}>
            <label className="text-2xl m-2 text-white" htmlFor="inputPackage">Package Name</label>
            {/* <input className="focus:border-accent border-b-2 border-b-lbgrey text-white bg-input" required type="text" id="inputPackage"/> */}
            <input className="mt-1 block px-3 py-2 bg-input border border-lbgrey rounded-md text-white shadow-sm
      focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent" required type="text" id="inputPackage"/>
            <button className="py-2 px-4 m-3 text-l rounded bg-bgrey hover:bg-accent text-white hover:text-bgrey border-2 border-accent font-extrabold">
                SHOW GRAPH
            </button>
        </form>
    );
}

export default PackageForm;