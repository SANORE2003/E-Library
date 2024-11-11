import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';

const MainPage = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 8;
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [searchType, setSearchType] = useState('title');

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            fetch('http://localhost:5000/api/books')
                .then(response => response.json())
                .then(data => {
                    setBooks(data);
                    setFilteredBooks(data);
                })
                .catch(err => console.error('Error fetching books:', err));
        }
    }, [navigate, user]);

    const handleBookClick = (book) => {
        navigate(`/books/${book._id}`);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        
        if (term.trim() === '') {
            setSuggestions([]);
            setShowSuggestions(false);
            setFilteredBooks(books);
        } else {
            const suggestedBooks = books.filter(book => {
                return searchType === 'title'
                    ? book.title.toLowerCase().includes(term)
                    : book.author.toLowerCase().includes(term);
            });
            setSuggestions(suggestedBooks.slice(0, 5));
            setShowSuggestions(true);
            setFilteredBooks(suggestedBooks);
        }
        setCurrentPage(1);
    };

    const handleSuggestionClick = (book) => {
        setSearchTerm(searchType === 'title' ? book.title : book.author);
        setSuggestions([]);
        setShowSuggestions(false);
        handleBookClick(book);
    };

    const handleClickOutside = () => {
        setTimeout(() => {
            setShowSuggestions(false);
        }, 200);
    };

    const handleSearchTypeChange = (type) => {
        setSearchType(type);
        setSearchTerm('');
        setSuggestions([]);
        setShowSuggestions(false);
        setFilteredBooks(books);
    };

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="main-page" style={{
            padding: '2rem',
            backgroundColor: '#f7fafc',
            minHeight: '100vh',
            position: 'relative'
        }}>
            {/* Account Icon */}
            <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                <button
                    onClick={() => navigate('/account')}
                    style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#4299E1',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        transition: 'color 0.2s'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.color = '#3182CE';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.color = '#4299E1';
                    }}
                >
                    <User size={24} />
                    <span>{user ? user.username : 'Guest'}</span>
                </button>
            </div>

            {/* Logout Button */}
            <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                <button 
                    onClick={handleLogout}
                    style={{
                        backgroundColor: '#4299E1',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#3182CE';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = '#4299E1';
                    }}
                >
                    Logout
                </button>
            </div>

            <h1 style={{
                textAlign: 'center',
                color: '#2d3748',
                fontSize: '2.5rem',
                marginBottom: '2.5rem',
                fontWeight: 'bold',
                textTransform: 'capitalize'
            }}>
                Welcome, {user ? user.username : 'Guest'}!
            </h1>

            {/* Search Section */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '2rem',
                gap: '1rem'
            }}>
                {/* Search Type Toggle */}
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '0.5rem'
                }}>
                    <button
                        onClick={() => handleSearchTypeChange('title')}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            border: 'none',
                            backgroundColor: searchType === 'title' ? '#4299E1' : '#EDF2F7',
                            color: searchType === 'title' ? 'white' : '#2D3748',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s'
                        }}
                    >
                        Search by Title
                    </button>
                    <button
                        onClick={() => handleSearchTypeChange('author')}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            border: 'none',
                            backgroundColor: searchType === 'author' ? '#4299E1' : '#EDF2F7',
                            color: searchType === 'author' ? 'white' : '#2D3748',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s'
                        }}
                    >
                        Search by Author
                    </button>
                </div>

                {/* Search Input */}
                <div style={{ position: 'relative', width: '300px' }}>
                    <input
                        type="text"
                        placeholder={searchType === 'title' ? "Search books..." : "Search authors..."}
                        value={searchTerm}
                        onChange={handleSearch}
                        onBlur={handleClickOutside}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            border: '1px solid #CBD5E0',
                            width: '100%',
                            fontSize: '1rem',
                            outline: 'none',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                        }}
                    />
                    {showSuggestions && suggestions.length > 0 && (
                        <div style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            backgroundColor: 'white',
                            border: '1px solid #CBD5E0',
                            borderRadius: '4px',
                            marginTop: '0.5rem',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                            zIndex: 1000
                        }}>
                            {suggestions.map((book) => (
                                <div
                                    key={book._id}
                                    onClick={() => handleSuggestionClick(book)}
                                    style={{
                                        padding: '0.75rem 1rem',
                                        cursor: 'pointer',
                                        borderBottom: '1px solid #E2E8F0',
                                        transition: 'background-color 0.2s'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.backgroundColor = '#EDF2F7';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }}
                                >
                                    <div>{searchType === 'title' ? book.title : book.author}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#718096' }}>
                                        {searchType === 'title' ? book.author : book.title}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Books Grid */}
            <div className="books-container" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: '2.5rem',
                padding: '1rem',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {currentBooks.map((book) => (
                    <div
                        key={book._id}
                        onClick={() => handleBookClick(book)}
                        style={{
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            padding: '1rem',
                            cursor: 'pointer',
                            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            height: '100%'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                        }}
                    >
                        <div style={{
                            width: '180px',
                            height: '260px',
                            borderRadius: '4px',
                            border: '1px solid #e2e8f0',
                            overflow: 'hidden'
                        }}>
                            <img
                                src={book.image}
                                alt={book.title}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    display: 'block'
                                }}
                            />
                        </div>
                        
                        <div style={{
                            textAlign: 'center',
                            marginTop: '1rem',
                            width: '100%'
                        }}>
                            <h2 style={{
                                fontSize: '1.1rem',
                                color: '#2d3748',
                                margin: '0 0 0.5rem 0',
                                fontWeight: '600',
                                lineHeight: '1.4',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: '2',
                                WebkitBoxOrient: 'vertical'
                            }}>
                                {book.title}
                            </h2>
                            <p style={{
                                fontSize: '0.9rem',
                                color: '#718096',
                                margin: '0',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}>
                                {book.author}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
                marginTop: '2rem',
                padding: '1rem'
            }}>
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        border: 'none',
                        backgroundColor: currentPage === 1 ? '#CBD5E0' : '#4299E1',
                        color: 'white',
                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                        transition: 'background-color 0.2s'
                    }}
                >
                    Previous
                </button>
                
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            border: 'none',
                            backgroundColor: currentPage === index + 1 ? '#4299E1' : '#EDF2F7',
                            color: currentPage === index + 1 ? 'white' : '#2D3748',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s'
                        }}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        border: 'none',
                        backgroundColor: currentPage === totalPages ? '#CBD5E0' : '#4299E1',
                        color: 'white',
                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                        transition: 'background-color 0.2s'
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default MainPage;
