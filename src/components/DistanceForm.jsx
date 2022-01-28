import { useContext } from "react";
import { GraphContext } from "../context/GraphContext";
import { MessageContext } from "../context/MessageContext";

function DistanceForm() {


    const {graphSettings, setGraphSettings} = useContext(GraphContext);
    const {setMessage, setAlertColor} = useContext(MessageContext);

    function changeNodeColor(node, color, location) {
        const nodes = graphSettings.nodes;
        nodes.splice(location, 1, {...node, color: color});
        const newGraph = {...graphSettings};
        newGraph.nodes = nodes;
        setGraphSettings("");
        setGraphSettings(newGraph);
    }

    function resetNodeColors() {
        const nodes = graphSettings.nodes;
        for (let i = 0; i < graphSettings.nodes.length; i++) {
            const node = graphSettings.nodes[i];
            if (node.color !== "red" || node.color !== "blue") {
                nodes.splice(i,1,{...node, color: "#F6EE3F"});
                // setGraphSettings("")
                setGraphSettings({...graphSettings, nodes: nodes});
            }
        }
    }

    async function findDistanceBetween(e) {
        e.preventDefault();
        const form = e.target;
        const package1 = form[0].value;
        const package2 = form[1].value;

        // clear input fields
        form[0].value = "";
        form[1].value = "";

        const res = await fetch("/distanceBetween", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({package1, package2})
        });
        const data = await res.json();
        if (data.errorMessage) {
            setAlertColor("red-500");
            setMessage(data.errorMessage);
        } else {
            setAlertColor("accent");
            setMessage(data.message);
            
            resetNodeColors();

            for (let pkg of data.path) {
                for (let i = 0; i < graphSettings.nodes.length; i++) {
                    const node = graphSettings.nodes[i];
                    if (node.id === pkg) {
                        changeNodeColor(node, "#60A5FA", i);
                    }
                }
            }
        }
    }

    return (
        <form className="flex flex-col items-center justify-center" onSubmit={(event) => findDistanceBetween(event)}>
            <label className="text-2xl text-white" htmlFor="package">Find the distance between two packages</label>
            <input required className="mt-3 block px-3 py-2 bg-input border border-lbgrey rounded-md text-white shadow-sm
      focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent" type="text" id="package"/>
            <input required className="mt-3 block px-3 py-2 bg-input border border-lbgrey rounded-md text-white shadow-sm
      focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent" type="text"/>
            <button className="mt-3 py-2 px-4 m-2 text-l rounded bg-bgrey hover:bg-accent text-white hover:text-bgrey border-2 border-accent font-extrabold">
                FIND DISTANCE
            </button>
        </form>
    );
}

export default DistanceForm;