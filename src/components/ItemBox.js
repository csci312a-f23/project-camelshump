import PropTypes from "prop-types";

export default function ItemBox({ inventory, closeItemBox, itemAction }) {
    const buttonArray = inventory.map((item) => {
        return ( 
        <button type="button" onClick={() => itemAction(`${item.name}`)}>
            {" "}
            {item.name}{" "}
        </button>
        )
    });

    return (
        <div>
            {buttonArray}
            <button type="button" onClick={() => closeItemBox()}>
                {" "}
                Close{" "}
            </button>
        </div>
    );
}

ItemBox.propTypes = {
    closeItemBox: PropTypes.func.isRequired,
    itemAction: PropTypes.func.isRequired,
};