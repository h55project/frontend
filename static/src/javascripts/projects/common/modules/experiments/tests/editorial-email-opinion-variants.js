define([
    'bean',
    'fastdom',
    'qwery',
    'common/utils/$',
    'common/utils/config',
    'common/utils/fastdom-promise'
], function (
    bean,
    fastdom,
    qwery,
    $,
    config,
    fastdomPromise
) {
    return function () {
        this.id = 'EditorialEmailOpinionVariants';
        this.start = '2016-12-14';
        this.expiry = '2017-01-22';
        this.author = 'Kate Whalen';
        this.description = 'Using the wonderful frontend AB testing framework to AB test emails, since the AB function in ExactTarget re-randomises all recipients on each send, and we need users to receive their variant for several weeks. This test will ensure users are added to the corresponding email list (listId) in ExactTarget';
        this.audience = 1;
        this.audienceOffset = 0;
        this.successMeasure = 'We can trial two different email formats of the Best of Opinion UK, to fairly compare their CTO rates';
        this.audienceCriteria = 'All UK based users who visit the email sign up page';
        this.dataLinkNames = '';
        this.idealOutcome = 'Similar quantity of users in each list in ExactTarget';

        this.canRun = function () {
            return (config.page.edition === 'UK' &&
            config.page.webTitle.toLowerCase() === 'sign up for the flyer');
        };

        function updateExampleUrl(exampleUrl) {
          return fastdomPromise.write(function () {
            var example = $('.js-email-example')[0];
            example.setAttribute('href', exampleUrl);
          });
        }

        function enhanceWebView(emailListID) {
          var emailForm = $('.js-email-sub__iframe')[0];
          emailForm.setAttribute('src', 'https://www.theguardian.com/email/form/plaintone/' + emailListID);
        }

        this.variants = [
            {
                id: 'Opinion-Joined',
                test: function () {
                    var emailListID = 9999;
                    var exampleUrl = 'https://www.theguardian.com/email/the-flyer?format=email';
                    enhanceWebView(emailListID);
                    updateExampleUrl(exampleUrl);
                }
            },
            {
                id: 'Opinion-Control',
                test: function () {
                    var emailListID = 8888;
                    var exampleUrl = 'https://www.theguardian.com/email/the-flyer?format=email-connected';
                    enhanceWebView(emailListID);
                    updateExampleUrl(exampleUrl);
                }
            }
        ];
    };
});
