
import './screnManipulate.scss'

interface ScrenManipulate {
    handleCenter: () => void,
    handleZoomIn: () => void,
    handleZoomOut: () => void
    percZoom: number
}

const ScrenManipulate = ({ handleCenter, handleZoomIn, handleZoomOut, percZoom }: ScrenManipulate) => {
    return (
        <div className='buttonsContainer'>
            <button onClick={handleCenter} className='button'></button>
            <button onClick={handleZoomIn} className='button'>+</button>
            <div>{percZoom * 10}%</div>
            <button onClick={handleZoomOut} className='button'>-</button>
        </div>
    );
};

export default ScrenManipulate;

