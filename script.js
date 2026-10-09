const startBtn = document.getElementById("startBtn");
const calculatorBackBtn = document.getElementById("calculatorBackBtn");
const backBtn = document.getElementById("backBtn");

const creditsBtn = document.getElementById("creditsBtn");
const creditsBackBtn = document.getElementById("creditsBackBtn");

const welcomePage = document.getElementById("welcome-page");
const calculatorPage = document.getElementById("calculator-page");
const resultPage = document.getElementById("result-page");
const creditsPage = document.getElementById("credits-page");

const backgroundMusic = document.getElementById("backgroundMusic");
const musicBtn = document.getElementById("musicBtn");

const loanInput = document.getElementById("loan");
const interestInput = document.getElementById("interest");
const monthsInput = document.getElementById("months");

const loanSuggestions = document.getElementById("loanSuggestions");
const interestSuggestions = document.getElementById("interestSuggestions");
const termSuggestions = document.getElementById("termSuggestions");

const loanButtons = document.querySelectorAll(".loan-options button");
const interestButtons = document.querySelectorAll(".interest-options button");
const termButtons = document.querySelectorAll(".term-options button");

const calculateBtn = document.getElementById("calculateBtn");

const result = document.getElementById("result");

const tableBtn = document.getElementById("tableBtn");
const chartBtn = document.getElementById("chartBtn");

const tableContainer = document.getElementById("table-container");
const chartContainer = document.getElementById("chart-container");

const tableBody = document.getElementById("table-body");


/* =========================
   MUSIC SETTINGS
========================= */

let musicStarted = false;
let musicMuted = true;

backgroundMusic.volume = 0;

musicBtn.textContent = "🔇";
musicBtn.setAttribute("aria-label", "Unmute music");


/* =========================
   PAGE NAVIGATION
========================= */

startBtn.addEventListener("click", function() {

    welcomePage.style.display = "none";
    calculatorPage.style.display = "block";
    resultPage.style.display = "none";
    creditsPage.style.display = "none";

});


calculatorBackBtn.addEventListener("click", function() {

    calculatorPage.style.display = "none";
    resultPage.style.display = "none";
    creditsPage.style.display = "none";
    welcomePage.style.display = "flex";

});


creditsBtn.addEventListener("click", function() {

    welcomePage.style.display = "none";
    calculatorPage.style.display = "none";
    resultPage.style.display = "none";
    creditsPage.style.display = "block";

});


creditsBackBtn.addEventListener("click", function() {

    creditsPage.style.display = "none";
    welcomePage.style.display = "flex";

});


backBtn.addEventListener("click", function() {

    resultPage.style.display = "none";
    calculatorPage.style.display = "block";

});


/* =========================
   MUSIC BUTTON
========================= */

musicBtn.addEventListener("click", function(event) {

    event.preventDefault();
    event.stopPropagation();

    if (musicMuted) {

        musicMuted = false;

        backgroundMusic.volume = 2.0;

        backgroundMusic.play()
            .then(function() {

                musicStarted = true;

                musicBtn.textContent = "🔊";

                musicBtn.setAttribute(
                    "aria-label",
                    "Mute music"
                );

            })
            .catch(function(error) {

                console.log(
                    "Audio gagal diputar:",
                    error
                );

                musicMuted = true;

                backgroundMusic.volume = 0;

                musicBtn.textContent = "🔇";

            });

    } else {

        musicMuted = true;

        backgroundMusic.volume = 0;

        backgroundMusic.pause();

        musicBtn.textContent = "🔇";

        musicBtn.setAttribute(
            "aria-label",
            "Unmute music"
        );

    }

});


/* =========================
   AUDIO ERROR
========================= */

backgroundMusic.addEventListener(
    "error",
    function() {

        console.log(
            "File audio tidak dapat dimuat."
        );

        musicMuted = true;
        musicStarted = false;

        backgroundMusic.volume = 0;

        musicBtn.textContent = "🔇";

    }
);


/* =========================
   LOAN NUMBER FORMAT
========================= */

function formatLoanInput(value) {

    const digits = value.replace(/\D/g, "");

    if (digits === "") {
        return "";
    }

    return Number(digits).toLocaleString("id-ID");
}

function parseLoanInput(value) {

    return Number(
        value.replace(/\./g, "")
    );

}


/* =========================
   AUTO FORMAT LOAN
========================= */

loanInput.addEventListener("input", function() {

    const cursorPosition =
        loanInput.selectionStart;

    const oldValue =
        loanInput.value;

    const digitsBeforeCursor =
        oldValue
            .slice(0, cursorPosition)
            .replace(/\D/g, "")
            .length;

    loanInput.value =
        formatLoanInput(oldValue);

    let newCursorPosition = 0;
    let digitCount = 0;

    while (
        newCursorPosition <
            loanInput.value.length &&
        digitCount <
            digitsBeforeCursor
    ) {

        if (
            /\d/.test(
                loanInput.value[newCursorPosition]
            )
        ) {

            digitCount++;

        }

        newCursorPosition++;

    }

    loanInput.setSelectionRange(
        newCursorPosition,
        newCursorPosition
    );

    loanButtons.forEach(function(button) {

        button.classList.remove("selected");

    });

});


/* =========================
   AUTO COMMA INTEREST
========================= */

interestInput.addEventListener("input", function() {

    let value = interestInput.value;

    value = value.replace(/\./g, ",");

    interestInput.value = value;

    interestButtons.forEach(function(button) {

        button.classList.remove("selected");

    });

});


/* =========================
   QUICK SUGGESTIONS
========================= */

function showSuggestion(suggestion) {

    suggestion.classList.add("show");

}

function hideSuggestion(suggestion) {

    suggestion.classList.remove("show");

}


/* =========================
   SHOW SUGGESTIONS
========================= */

loanInput.addEventListener("focus", function() {

    showSuggestion(loanSuggestions);

});

interestInput.addEventListener("focus", function() {

    showSuggestion(interestSuggestions);

});

monthsInput.addEventListener("focus", function() {

    showSuggestion(termSuggestions);

});


/* =========================
   LOAN SUGGESTIONS
========================= */

loanButtons.forEach(function(button) {

    button.addEventListener("pointerdown", function(event) {

        event.preventDefault();
        event.stopPropagation();

        loanButtons.forEach(function(btn) {

            btn.classList.remove("selected");

        });

        button.classList.add("selected");

        const value =
            button.textContent
                .replace("Rp", "")
                .replace(/\./g, "")
                .trim();

        loanInput.value =
            Number(value).toLocaleString("id-ID");

        hideSuggestion(loanSuggestions);

    });

});


/* =========================
   INTEREST SUGGESTIONS
========================= */

interestButtons.forEach(function(button) {

    button.addEventListener("pointerdown", function(event) {

        event.preventDefault();
        event.stopPropagation();

        interestButtons.forEach(function(btn) {

            btn.classList.remove("selected");

        });

        button.classList.add("selected");

        const value =
            button.textContent
                .replace("%", "")
                .trim();

        interestInput.value = value;

        hideSuggestion(interestSuggestions);

    });

});


/* =========================
   TERM SUGGESTIONS
========================= */

termButtons.forEach(function(button) {

    button.addEventListener("pointerdown", function(event) {

        event.preventDefault();
        event.stopPropagation();

        termButtons.forEach(function(btn) {

            btn.classList.remove("selected");

        });

        button.classList.add("selected");

        const value =
            button.textContent
                .replace("Months", "")
                .trim();

        monthsInput.value = value;

        hideSuggestion(termSuggestions);

    });

});


/* =========================
   CLICK OUTSIDE
========================= */

document.addEventListener("click", function(event) {

    if (
        !loanInput.contains(event.target) &&
        !loanSuggestions.contains(event.target)
    ) {

        hideSuggestion(loanSuggestions);

    }

    if (
        !interestInput.contains(event.target) &&
        !interestSuggestions.contains(event.target)
    ) {

        hideSuggestion(interestSuggestions);

    }

    if (
        !monthsInput.contains(event.target) &&
        !termSuggestions.contains(event.target)
    ) {

        hideSuggestion(termSuggestions);

    }

});


/* =========================
   CALCULATE
========================= */

calculateBtn.addEventListener("click", function() {

    const principal =
        parseLoanInput(loanInput.value);

    const monthlyInterest =
        Number(
            interestInput.value.replace(",", ".")
        ) / 100;

    const months =
        Number(monthsInput.value);

    if (
        !Number.isFinite(principal) ||
        !Number.isFinite(monthlyInterest) ||
        !Number.isFinite(months) ||
        principal <= 0 ||
        monthlyInterest < 0 ||
        months <= 0 ||
        !Number.isInteger(months)
    ) {

        alert(
            "Please enter a valid loan amount, interest rate, and whole number of months."
        );

        return;

    }


    let annuity;

    if (monthlyInterest === 0) {

        annuity =
            principal / months;

    } else {

        annuity =
            principal *
            (
                monthlyInterest *
                Math.pow(
                    1 + monthlyInterest,
                    months
                )
            ) /
            (
                Math.pow(
                    1 + monthlyInterest,
                    months
                ) - 1
            );

    }


    const totalPayment =
        annuity * months;

    const totalInterest =
        totalPayment - principal;


    result.innerHTML = `

        <p>
            Monthly Annuity:<br>
            ${formatRupiah(annuity)}
        </p>

        <p>
            Total Payment:<br>
            ${formatRupiah(totalPayment)}
        </p>

        <p>
            Total Interest:<br>
            ${formatRupiah(totalInterest)}
        </p>

    `;


    tableBody.innerHTML = "";

    let remainingBalance =
        principal;


    for (
        let month = 1;
        month <= months;
        month++
    ) {

        const interestPayment =
            remainingBalance *
            monthlyInterest;

        let principalPayment =
            annuity -
            interestPayment;

        let payment =
            annuity;

        if (month === months) {

            principalPayment =
                remainingBalance;

            payment =
                principalPayment +
                interestPayment;

        }

        remainingBalance =
            remainingBalance -
            principalPayment;

        if (remainingBalance < 0) {

            remainingBalance = 0;

        }

        const row =
            document.createElement("tr");

        row.innerHTML = `

            <td>${month}</td>

            <td>
                ${formatRupiah(payment)}
            </td>

            <td>
                ${formatRupiah(principalPayment)}
            </td>

            <td>
                ${formatRupiah(interestPayment)}
            </td>

            <td>
                ${formatRupiah(remainingBalance)}
            </td>

        `;

        tableBody.appendChild(row);

    }


    calculatorPage.style.display = "none";
    welcomePage.style.display = "none";
    creditsPage.style.display = "none";

    resultPage.style.display = "block";


    resultPage.classList.remove("result-refresh");

    void resultPage.offsetWidth;

    resultPage.classList.add("result-refresh");


    tableContainer.style.display = "block";
    chartContainer.style.display = "none";

    tableBtn.classList.add("active");
    chartBtn.classList.remove("active");


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* =========================
   TABLE BUTTON
========================= */

tableBtn.addEventListener("click", function() {

    tableContainer.style.display = "block";
    chartContainer.style.display = "none";

    tableBtn.classList.add("active");
    chartBtn.classList.remove("active");

});


/* =========================
   CHART BUTTON
========================= */

chartBtn.addEventListener("click", function() {

    tableContainer.style.display = "none";
    chartContainer.style.display = "block";

    chartBtn.classList.add("active");
    tableBtn.classList.remove("active");

    createChart();

});


/* =========================
   FORMAT RUPIAH
========================= */

function formatRupiah(number) {

    return new Intl.NumberFormat(
        "id-ID",
        {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }
    ).format(number);

}


/* =========================
   CREATE CHART
========================= */

function createChart() {

    const canvas =
        document.createElement("canvas");

    canvas.width = 800;
    canvas.height = 400;

    const chart =
        document.getElementById("chart");

    chart.innerHTML = "";

    chart.appendChild(canvas);

    const ctx =
        canvas.getContext("2d");

    const principal =
        parseLoanInput(loanInput.value);

    const monthlyInterest =
        Number(
            interestInput.value.replace(",", ".")
        ) / 100;

    const months =
        Number(monthsInput.value);

    let annuity;

    if (monthlyInterest === 0) {

        annuity =
            principal / months;

    } else {

        annuity =
            principal *
            (
                monthlyInterest *
                Math.pow(
                    1 + monthlyInterest,
                    months
                )
            ) /
            (
                Math.pow(
                    1 + monthlyInterest,
                    months
                ) - 1
            );

    }

    let balance =
        principal;

    const principalData = [];
    const interestData = [];

    for (
        let month = 1;
        month <= months;
        month++
    ) {

        const interestPayment =
            balance *
            monthlyInterest;

        let principalPayment =
            annuity -
            interestPayment;

        if (month === months) {

            principalPayment =
                balance;

        }

        principalData.push(
            principalPayment
        );

        interestData.push(
            interestPayment
        );

        balance =
            balance -
            principalPayment;

        if (balance < 0) {

            balance = 0;

        }

    }


    const maxValue =
        Math.max(
            ...principalData,
            ...interestData
        );


    const chartWidth =
        canvas.width;

    const chartHeight =
        canvas.height;


    const paddingLeft = 60;
    const paddingRight = 25;
    const paddingTop = 25;
    const paddingBottom = 55;


    const usableWidth =
        chartWidth -
        paddingLeft -
        paddingRight;

    const usableHeight =
        chartHeight -
        paddingTop -
        paddingBottom;


    const barGroupWidth =
        usableWidth / months;

    const barWidth =
        Math.max(
            3,
            barGroupWidth * 0.7
        );


    ctx.clearRect(
        0,
        0,
        chartWidth,
        chartHeight
    );


    ctx.font =
        "16px Nunito, Arial";

    ctx.textAlign =
        "center";


    for (
        let i = 0;
        i < months;
        i++
    ) {

        const x =
            paddingLeft +
            i * barGroupWidth +
            (barGroupWidth - barWidth) / 2;


        const principalHeight =
            maxValue === 0
                ? 0
                : (
                    principalData[i] /
                    maxValue
                ) *
                usableHeight;


        const interestHeight =
            maxValue === 0
                ? 0
                : (
                    interestData[i] /
                    maxValue
                ) *
                usableHeight;


        const principalGradient =
            ctx.createLinearGradient(
                0,
                chartHeight - paddingBottom,
                0,
                chartHeight -
                    paddingBottom -
                    principalHeight
            );


        principalGradient.addColorStop(
            0,
            "#2f80ed"
        );

        principalGradient.addColorStop(
            1,
            "#8ed8ff"
        );


        ctx.fillStyle =
            principalGradient;


        ctx.fillRect(
            x,
            chartHeight -
                paddingBottom -
                principalHeight,
            barWidth / 2,
            principalHeight
        );


        const interestGradient =
            ctx.createLinearGradient(
                0,
                chartHeight - paddingBottom,
                0,
                chartHeight -
                    paddingBottom -
                    interestHeight
            );


        interestGradient.addColorStop(
            0,
            "#45b649"
        );

        interestGradient.addColorStop(
            1,
            "#a8e063"
        );


        ctx.fillStyle =
            interestGradient;


        ctx.fillRect(
            x + barWidth / 2,
            chartHeight -
                paddingBottom -
                interestHeight,
            barWidth / 2,
            interestHeight
        );


        if (
            months <= 24 ||
            i % Math.ceil(months / 12) === 0
        ) {

            ctx.fillStyle =
                "#075985";

            ctx.fillText(
                i + 1,
                x + barWidth / 2,
                chartHeight - 30
            );

        }

    }


    ctx.strokeStyle =
        "rgba(255, 255, 255, 0.75)";

    ctx.lineWidth = 1;

    ctx.beginPath();

    ctx.moveTo(
        paddingLeft,
        paddingTop
    );

    ctx.lineTo(
        paddingLeft,
        chartHeight -
            paddingBottom
    );

    ctx.lineTo(
        chartWidth -
            paddingRight,
        chartHeight -
            paddingBottom
    );

    ctx.stroke();


    ctx.fillStyle =
        "#075985";

    ctx.font =
        "19px Nunito, Arial";

    ctx.textAlign =
        "center";

    ctx.fillText(
        "Month",
        chartWidth / 2,
        chartHeight - 8
    );


    ctx.save();

    ctx.translate(
        15,
        chartHeight / 2
    );

    ctx.rotate(
        -Math.PI / 2
    );

    ctx.fillText(
        "Payment",
        0,
        0
    );

    ctx.restore();

}

/* =========================
   EASTER EGG
========================= */

const easterEggPopup =
    document.getElementById("easterEggPopup");

const easterEggAudio =
    document.getElementById("easterEggAudio");


let easterEggActive = false;


/* =========================
   SHOW EASTER EGG
========================= */

function showEasterEgg() {

    if (!easterEggPopup || !easterEggAudio) {
        return;
    }


    easterEggActive = true;


    /*
     * Tampilkan popup
     */

    easterEggPopup.classList.add("show");


    /*
     * Blok scroll halaman
     */

    document.body.style.overflow =
        "hidden";


    /*
     * Hentikan background music
     * sementara Easter Egg berlangsung
     */

    if (backgroundMusic) {

        backgroundMusic.pause();

    }


    /*
     * Reset audio Easter Egg
     */

    easterEggAudio.currentTime = 0;


    /*
     * Putar audio
     */

    easterEggAudio.play()
        .catch(function(error) {

            console.log(
                "Easter Egg audio gagal diputar:",
                error
            );

        });

}


/* =========================
   CLOSE EASTER EGG
========================= */

function hideEasterEgg() {

    if (!easterEggPopup) {
        return;
    }


    easterEggActive = false;


    easterEggPopup.classList.remove(
        "show"
    );


    document.body.style.overflow =
        "";


    /*
     * Stop dan reset audio Easter Egg
     */

    if (easterEggAudio) {

        easterEggAudio.pause();

        easterEggAudio.currentTime = 0;

    }


    /*
     * Kembalikan background music
     * hanya kalau sebelumnya memang
     * sedang tidak muted.
     */

    if (
        typeof musicMuted !== "undefined" &&
        musicMuted === false &&
        backgroundMusic
    ) {

        backgroundMusic.play()
            .catch(function(error) {

                console.log(
                    "Background music gagal dilanjutkan:",
                    error
                );

            });

    }

}


/* =========================
   AUDIO SELESAI
========================= */

if (easterEggAudio) {

    easterEggAudio.addEventListener(
        "ended",
        function() {

            hideEasterEgg();

        }
    );

}


/* =========================
   CHECK EASTER EGG
========================= */

calculateBtn.addEventListener(
    "click",
    function() {

        /*
         * Tunggu sebentar supaya
         * nilai input yang sedang
         * diproses oleh kalkulator
         * sudah terbaca.
         */

        setTimeout(function() {

            if (easterEggActive) {
                return;
            }


            const loan =
                parseLoanInput(
                    loanInput.value
                );


            const interest =
                Number(
                    interestInput.value
                        .replace(",", ".")
                );


            const months =
                Number(
                    monthsInput.value
                );


            /*
             * KONDISI EASTER EGG
             *
             * Loan     = 67
             * Interest = 67
             * Months   = 67
             */

            if (
                loan === 67 &&
                interest === 67 &&
                months === 67
            ) {

                showEasterEgg();

            }

        }, 0);

    }
);
