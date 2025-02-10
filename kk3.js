
const investmentForm = document.getElementById('investment-form');
const investmentList = document.getElementById('investment-list');
const totalValueElement = document.getElementById('total-value');
const portfolioChartElement = document.getElementById('portfolio-chart');


let investments = [];
let portfolioChart;


investmentForm.addEventListener('submit', (e) =>
 {
    e.preventDefault();
    addInvestment();
});


function addInvestment()
 {
    const assetName = document.getElementById('asset-name').value;
    const amountInvested = parseFloat(document.getElementById('amount-invested').value);
    const currentValue = parseFloat(document.getElementById('current-value').value);

    const newInvestment = { assetName, amountInvested, currentValue };
    investments.push(newInvestment);

    updateInvestmentList();
    updatePortfolioValue();
    updateChart();
    investmentForm.reset();
}

function updateInvestmentList() 
{
    investmentList.innerHTML = '';

    investments.forEach((investment, index) => 
    {
        const percentageChange = (((investment.currentValue - investment.amountInvested) / investment.amountInvested) * 100).toFixed(2);
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${investment.assetName}</td>
            <td>$${investment.amountInvested.toFixed(2)}</td>
            <td>$${investment.currentValue.toFixed(2)}</td>
            <td>${percentageChange}%</td>
            <td class="actions">
                <button class="update-btn" onclick="updateInvestment(${index})">Update</button>
                <button class="remove-btn" onclick="removeInvestment(${index})">Remove</button>
            </td>
        `;

        investmentList.appendChild(row);
    });
}


function updatePortfolioValue() 
{
    const totalValue = investments.reduce((acc, investment) => acc + investment.currentValue, 0);
    totalValueElement.textContent = totalValue.toFixed(2);
}


function removeInvestment(index) 
{
    investments.splice(index, 1);
    updateInvestmentList();
    updatePortfolioValue();
    updateChart();
}

function updateInvestment(index)
 {
    const newValue = parseFloat(prompt('Enter new current value:'));
    if (!isNaN(newValue)) {
        investments[index].currentValue = newValue;
        updateInvestmentList();
        updatePortfolioValue();
        updateChart();
    }
}

function updateChart() {
    const assetNames = investments.map(investment => investment.assetName);
    const values = investments.map(investment => investment.currentValue);

    if (portfolioChart) {
        portfolioChart.destroy();
    }

    portfolioChart = new Chart(portfolioChartElement, {
        type: 'pie',
        data: {
            labels: assetNames,
            datasets: [{
                data: values,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
            }
        }
    });
}
