import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/books/${id}`);
                setBook(response.data);
            } catch (error) {
                console.error('Error fetching book details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBook();
    }, [id]);

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f0f7ff 0%, #f5f0ff 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Decorative Elements */}
            <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '300px',
                height: '300px',
                background: 'rgba(147, 197, 253, 0.3)',
                borderRadius: '50%',
                transform: 'translate(150px, -150px)'
            }} />
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '400px',
                height: '400px',
                background: 'rgba(167, 139, 250, 0.3)',
                borderRadius: '50%',
                transform: 'translate(-200px, 200px)'
            }} />
            
            {loading ? (
                <p style={{ 
                    textAlign: 'center', 
                    padding: '2rem',
                    position: 'relative' 
                }}>Loading...</p>
            ) : (
                book ? (
                    <div style={{
                        position: 'relative',
                        padding: '2rem',
                        maxWidth: '1200px',
                        margin: '0 auto',
                    }}>
                        {/* Main Content Container */}
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '16px',
                            padding: '2rem',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            display: 'flex',
                            gap: '2rem'
                        }}>
                            {/* Left side - Image */}
                            <div style={{ 
                                flex: '0 0 400px',
                                position: 'relative'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    inset: '-8px',
                                    background: 'linear-gradient(45deg, rgba(147, 197, 253, 0.3), rgba(167, 139, 250, 0.3))',
                                    borderRadius: '12px',
                                    transform: 'rotate(2deg)'
                                }} />
                                <img 
                                    src={book.image} 
                                    alt={book.title} 
                                    style={{ 
                                        width: '100%',
                                        height: 'auto',
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                        position: 'relative'
                                    }} 
                                />
                            </div>

                            {/* Right side - Book details */}
                            <div style={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                                position: 'relative'
                            }}>
                                <h1 style={{ 
                                    fontSize: '2.5rem',
                                    margin: '0',
                                    color: '#2d3748',
                                    position: 'relative'
                                }}>{book.title}</h1>
                                
                                <h2 style={{ 
                                    fontSize: '1.5rem',
                                    color: '#4a5568',
                                    margin: '0'
                                }}>by {book.author}</h2>
                                
                                <div style={{
                                    backgroundColor: 'rgba(247, 250, 252, 0.8)',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '8px',
                                    display: 'inline-block',
                                    alignSelf: 'flex-start',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                }}>
                                    <span style={{ 
                                        color: '#4a5568',
                                        fontWeight: 'bold'
                                    }}>Genre: </span>
                                    {book.genre}
                                </div>

                                <div style={{
                                    marginTop: '1rem',
                                    background: 'rgba(247, 250, 252, 0.8)',
                                    padding: '1.5rem',
                                    borderRadius: '12px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                }}>
                                    <h3 style={{
                                        fontSize: '1.2rem',
                                        color: '#4a5568',
                                        marginBottom: '0.5rem'
                                    }}>Summary</h3>
                                    <p style={{
                                        lineHeight: '1.6',
                                        color: '#2d3748'
                                    }}>{book.summary}</p>
                                </div>

                                <div style={{
                                    display: 'flex',
                                    gap: '1rem',
                                    marginTop: '2rem',
                                    alignItems: 'center'
                                }}>
                                    <a 
                                        href={book.pdfLink} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        style={{
                                            backgroundColor: '#4299e1',
                                            color: 'white',
                                            padding: '0.75rem 1.5rem',
                                            borderRadius: '8px',
                                            textDecoration: 'none',
                                            display: 'inline-block',
                                            fontWeight: 'bold',
                                            transition: 'all 0.2s',
                                            boxShadow: '0 4px 6px rgba(66, 153, 225, 0.2)',
                                            cursor: 'pointer'
                                        }}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.backgroundColor = '#3182ce';
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.backgroundColor = '#4299e1';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                        }}
                                    >
                                        Read PDF
                                    </a>
                                    
                                    <div style={{
                                        backgroundColor: 'rgba(247, 250, 252, 0.8)',
                                        padding: '0.75rem 1.5rem',
                                        borderRadius: '8px',
                                        color: '#4a5568',
                                        fontWeight: 'bold',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                        border: '1px solid rgba(226, 232, 240, 0.8)'
                                    }}>
                                        To buy this book contact +91 7550328275
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p style={{ 
                        textAlign: 'center', 
                        padding: '2rem',
                        position: 'relative' 
                    }}>Book not found.</p>
                )
            )}
        </div>
    );
};

export default BookDetails;