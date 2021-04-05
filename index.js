let vueInstance = new Vue({
    el: '#vue-app',
    delimiters: ['${', '}$'],
    //New Delimiters instead of default.

    data: {
        query: '',
        result: [],
        quotes: [],
        active: false,
        tbleactive: false,
    },
    methods: {
        getStock() {
            if (this.query.length < 1) {
                return;
            } else {

                axios({
                    method: 'GET',
                    url: `https://finnhub.io/api/v1/search?q=${this.query}&token=c1cev0748v6scqmqtpa0`,
                })
                    .then((resp) => {
                        //Show an alert if no results found from input.
                        this.result = resp.data.result.splice(0, 5);
                        //Store only first 5 results.
                        console.log(resp.data.result)
                    })
                    .catch(this.handleErrors)
            }

        },

        getQuote(r) {
            axios({
                method: 'GET',
                url: `https://finnhub.io/api/v1/quote?symbol=${r.displaySymbol}&token=c1cev0748v6scqmqtpa0`,
            })
                .then((resp) => {
                    this.tbleactive = true;
                    this.quotes.push(resp.data);
                    this.tickerToAdd = r.displaySymbol
                    resp.data.ticker = this.tickerToAdd;
                    // Emptying the array.
                })
                .catch(this.handleErrors)
        },

        // Removes the clicked stock ticker after being added to list.
        removeQuote(index) {
            this.quotes.splice(index, 1)
        },

        // Handle errors for both end points.
        handleErrors(err) {
            if (err.response) {
                alert(`Problem with response ${err.response.status}. Price Not Available for this ticker.`);
            } else if (err.request) {
                alert(`Problem with request.`);
            } else {
                alert(`Error ${err.message}, recheck API url.`);
            }
        },
        mouseOver() {
            this.active = true;
        },
        mouseLeave() {
            this.active = false;
        }
    }
});