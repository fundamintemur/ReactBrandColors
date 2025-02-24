import React, { useContext } from 'react';
import MainContext from '../MainContext';
import { getContrastYIQ } from '../helpers';
import { CopyToClipboard } from 'react-copy-to-clipboard';


function Brand({ brand }) {
    const { selectedBrands, setSelectedBrands, setCopied } = useContext(MainContext);

    const toggleSelected = () => {
        if (selectedBrands.includes(brand.slug)) {
            setSelectedBrands(selectedBrands.filter(slug => slug !== brand.slug));
        } else {
            setSelectedBrands([...selectedBrands, brand.slug]);
        }
    };

    const setColor = (color) => {
        setCopied(color);
    };

    return (
        <div className={`brand ${selectedBrands.includes(brand.slug) ? 'selected' : ''}`}>
            <h5 onClick={toggleSelected}>{brand.title}</h5>
            <div className='brand-colors'>
                {brand.colors.map((color, key) => (
                    <CopyToClipboard key={key} text={color} onCopy={() => setColor(color)}>
                        <span 
                            style={{ '--bgColor': `#${color}`, '--textColor': `${getContrastYIQ(color)}` }}>
                            {color}
                        </span>
                    </CopyToClipboard>
                ))}
            </div>
        </div>
    );
}

export default Brand;
