import Script from 'next/script'

function QuotePage() {
    return (
        <>

            <Script
                id="qmod"
                type="application/javascript"
                src="https://qmod.quotemedia.com/js/qmodLoader.js"
                data-qmod-wmid="92583"
            />
            Hello From Quote
            <div
                data-qmod-tool="fullnews"
                data-qmod-params='{"symbol":"GOOGL","lang":"en","autoUpdateEnabled":true}'
                className="qtool"
            ></div>
        </>
    )
}

export default QuotePage;