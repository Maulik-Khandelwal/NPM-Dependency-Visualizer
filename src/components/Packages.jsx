import { useContext } from "react";
import {GraphContext} from '../context/GraphContext';

function Packages() {

    const {dependencies} = useContext(GraphContext);
    
    return (
        <div className="mb-4 lg:w-1/2 sm:w-4/5 w-72">
            <h1 className="text-3xl my-4 font-bold text-center text-white">Dependencies Chart</h1>
            {Object.keys(dependencies)[0]
                ?   Object.keys(dependencies).map(pkg => (
                        <>
                            <div className="inline-block">
                                <h3 className="inline-block text-accent font-bold">{pkg}&nbsp;</h3>
                                <span className="text-white">&#10230;</span>
                            </div>
                            {dependencies[pkg].map(dependency => (
                                <div className="inline-block text-white">&nbsp;{dependency},&nbsp;</div>
                            ))}
                            <hr id="hr"/>
                        </>
                    ))
                :   <div className="text-center text-white">Enter a package name...</div>
            }
        </div>
    );
}

export default Packages;