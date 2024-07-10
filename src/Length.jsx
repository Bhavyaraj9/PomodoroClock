import './Length.css';

export default function Length({title, changeTime, type, time, formatTime}){
    return(
        <div>
            <h3>{title}</h3>
            <div className="time-sets">
                <button className="btn-small deep-purple lighten-2" 
                onClick={()=>changeTime(-60, type)}>
                    <i className="material-icons">arrow_downward</i>
                </button>
                <h3>{formatTime(time)}</h3>
                <button className="btn-small deep-purple lighten-2"
                onClick={()=>changeTime(-60, type)}>
                    <i className="material-icons">arrow-upward</i>
                </button>
            </div>
        </div>
    )
} 