const content = {
    response: null,
    result: null,
};

const setContent = (response, result) => {
    content.response = response;
    content.result = result;
};

const setContentAndCount = (response, result) => {
    content.result = {};
    content.response = response;
    content.result.count = result.length;
    content.result.rows = result;
};

const getContentSuccess = () => content;

const getContentFail = (error) => {
    // eslint-disable-next-line no-console
    console.log('\x1b[31m', 'Error: ', error);
    return content;
};

module.exports = {
    setContent,
    setContentAndCount,
    getContentSuccess,
    getContentFail,
};
