import { useContext, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { GrLinkPrevious } from 'react-icons/gr';
import Download from './Download';
import LazyLoad from 'react-lazyload';
import Brand from './Brand';
import MainContext from '../MainContext';
import Loader from './Loader';

function Collection() {
    const { slugs } = useParams();
    const navigate = useNavigate();
    const { setSelectedBrands, selectedBrands, setSearch, brands } = useContext(MainContext);

    const clearSelectedBrands = () => {
        setSelectedBrands([]);
        setSearch('');
        navigate('/');
    };

    useEffect(() => {
        setSelectedBrands(slugs.split(','));
    }, [slugs, setSelectedBrands]);

    return (
        <main className="content">
            <header className="header">
                <Link to="/" onClick={clearSelectedBrands} className="back-btn">
                    <GrLinkPrevious />
                    All Brands
                </Link>
                {selectedBrands.length !== 0 && <Download />}
            </header>
            <section className="brands">
                {selectedBrands.map(slug => {
                    let brand = brands.find(brand => brand.slug === slug);
                    return (
                        <LazyLoad key={brand.slug} once={true} overflow={true} placeholder={<Loader />}>
                            <Brand brand={brand} />
                        </LazyLoad>
                    );
                })}
            </section>
        </main>
    );
}

export default Collection;
