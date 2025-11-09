import React from 'react';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';
import ShareLocationOutlinedIcon from '@mui/icons-material/ShareLocationOutlined';

function SearchBar() {
    return (
        <div style={styles.container}>
            <div style={styles.inputContainer}>
                <ShareLocationOutlinedIcon style={styles.icon} />
                <input type="text" placeholder="Search location..." style={styles.input} />

            </div>
            <button style={styles.button}>
                <TravelExploreOutlinedIcon style={{ color: 'white'}} />
            </button>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
    },
    inputContainer: {
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #ccc',
        borderRadius: 10,
        width: '100%',
        padding: '5px',
    },
    input: {
        border: 'none',
        outline: 'none',
        flex: 1,
        padding: '5px',
        fontSize: '16px',
    },
    button: {
        background: 'red',
        marginLeft: 10,
        borderRadius: 20,
        cursor: 'pointer',
        padding: '10px',
    },
    icon: {
        color: '#555',
        fontSize: '24px',
    },
};

export default SearchBar;