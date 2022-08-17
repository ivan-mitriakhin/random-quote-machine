const colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
];

function App() {
    const [quotes, setQuotes] = React.useState([]);
    const [randomQuote, setRandomQuote] = React.useState([]);
    const [color, setColor] = React.useState('#000');
    const [opacity, setOpacity] = React.useState('0');

    React.useEffect(() => {
        async function fetchData() {
            const response = await fetch("https://type.fit/api/quotes");
            const data = await response.json();

            setQuotes(data);
            let randomIndex = Math.floor(Math.random() * data.length);
            let randomColorIndex = Math.floor(Math.random() * colors.length);
            setRandomQuote(data[randomIndex]);
            setColor(colors[randomColorIndex]);
            setOpacity('1');
        }
        fetchData();        
    }, []);

    const getNewQuote = () => {
        let randomIndex = Math.floor(Math.random() * quotes.length);
        let randomColorIndex = Math.floor(Math.random() * colors.length);

        setRandomQuote(quotes[randomIndex]);
        setColor(colors[randomColorIndex]);
    }

    return (
        <div id="wrapper" style={{backgroundColor: color, transition: "background-color 1.5s ease-in-out"}}>
            <div id="quote-box">
                <div className="quote-text" style={{color: color, opacity: opacity, transition: "all 1.5s ease-in-out"}}>
                    <i className="fa fa-quote-left"></i>
                    <span id="text">{randomQuote.text}</span>
                </div>
                <div className="quote-author" style={{color: color, opacity: opacity, transition: "all 1.5s ease-in-out"}}>
                    —{' '}
                    <span id="author">{randomQuote.author || "Undefined author"}</span>
                </div>
                <div className="buttons">
                    <a className="button" id="tweet-quote" title="Tweet this quote!" 
                    style={{backgroundColor: color, transition: "background-color 1.5s ease-in-out"}}
                    href={"https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
                        encodeURIComponent('"' + randomQuote.text + '" ' + randomQuote.author)}>
                        <i class="fa fa-twitter"></i>
                    </a>
                    <a className="button" id="tumblr-quote" title="Post this quote on tumblr!" target="_blank"
                       style={{backgroundColor: color, transition: "background-color 1.5s ease-in-out"}}
                       href={"https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" +
                       encodeURIComponent(randomQuote.author) +
                       "&content=" +
                       encodeURIComponent(randomQuote.text) +
                       "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button"}>
                        <i class="fa fa-tumblr"></i>
                    </a>
                    <button className="button" id="new-quote" onClick={getNewQuote} style={{backgroundColor: color, transition: "background-color 1.5s ease-in-out"}}>New Quote</button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

function Footer() {
    return (
        <div className="footer">
            made by
            <a className="text-decoration-none" href="https://github.com/ivan-mitriakhin"> ivan mitriakhin</a>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));