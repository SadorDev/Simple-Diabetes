import Stat from "./Stat";
import PropTypes from 'prop-types';

const Stats = ({ metrics }) => {
    return (
        <>
            {metrics.map((metric, index) => (
                <Stat
                    key={index} 
                    title={metric.title}
                    value={metric.value}
                    color="white"
                    icon={metric.icon}
                />
            ))}
        </>
    );
};

Stats.propTypes = {
    metrics: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            icon: PropTypes.node.isRequired,
        })
    ).isRequired,
};

export default Stats;