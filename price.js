'use strict';

const prices = {
    '5_6': [6570, 7760, 8960, 10130, 11340],
    '6_7': [6780, 8010, 9250, 10490, 11720],
    '7_8': [7530, 8900, 10320, 11720, 13120]
};

const addOns = {
    bath: 400,
    service: 220,
    dec: 470
};

const formatPrice = (price) => new Intl.NumberFormat().format(price) + '円';

const createPriceRows = (prices) => {
    const table = document.getElementById('price');
    const tbody = table.querySelector('tbody');

    Object.entries(prices).forEach(([range, priceList]) => {
        // Create header row for each range
        const headerRow = document.createElement('tr');
        const headerCell = document.createElement('td');
        headerCell.rowSpan = priceList.length + 1;
        headerCell.innerHTML = `${range.replace('_', '時間以上<br>')}時間未満`;
        headerRow.appendChild(headerCell);
        tbody.appendChild(headerRow);

        // Create price rows for each range
        priceList.forEach((price, index) => {
            const tr = document.createElement('tr');
            const tdLabel = document.createElement('td');
            tdLabel.textContent = `要介護${index + 1}`;
            tr.appendChild(tdLabel);

            const baseId = `price${range}_${index + 1}`;
            const tdBase = document.createElement('td');
            tdBase.id = baseId;
            tdBase.textContent = formatPrice(price);
            tr.appendChild(tdBase);

            for (let i = 1; i <= 3; i++) {
                const td = document.createElement('td');
                td.id = `${baseId}.${i}`;
                td.textContent = formatPrice(price * i * 0.1);
                tr.appendChild(td);
            }

            tbody.appendChild(tr);
        });
    });
};

createPriceRows(prices);

// Add-ons can be updated similarly if needed
const createTd = (id, price) => {
    const td = document.createElement('td');
    td.id = id;
    td.textContent = formatPrice(price);
    return td;
};

const updateAddOns = (addOns) => {
    Object.keys(addOns).forEach(key => {
        const price = addOns[key];
        const row = document.getElementById(`${key}_row`);

        // 既存の td 要素をリストに保存
        const first = Array.from(row.querySelectorAll('td:first-child'));
        const last = Array.from(row.querySelectorAll('td:last-child'));

        // 新しい td 要素を追加
        row.innerHTML = ''; // 既存の内容をクリア
        row.appendChild(createTd(key, price));
        for (let i = 1; i <= 3; i++) {
            row.appendChild(createTd(`${key}_${i}`, price * i * 0.1));
        }

        // 既存の td 要素を再度追加
        row.prepend(...first);
        row.append(...last);
    });
};

updateAddOns(addOns);



/* <tbody>
          <tr id="bath_row">
            <td>入浴介助加算</td>
            <td>入浴介助を<br>実施した日数</td>
          </tr>
          <tr id="service_row">
            <td>サービス提供体制強化加算Ⅰ</td>
            <td>サービス<br>提供日数</td>
          </tr>
          <tr id="dec_row">
            <td>送迎を行わない場合の減算<br>（ご家族の等の送迎）</td>
            <td>片道につき</td>
          </tr>
          <tr>
            <td>介護職員処遇改善加算（Ⅲ）</td>
            <td colspan="4">
              所定単位数の 80 / 1000 を加算<br>
              <span>※所定単位数：基本報酬に各種加算・減算を加えた総単位数</span>
            </td>
            <td>月1回</td>
          </tr>
          <tr>
            <td>中山間地域等に居住する者<br>へのサービス提供加算</td>
            <td colspan="4">基本報酬の 5% を加算</td>
            <td>サービス<br>提供日数</td>
          </tr>
        </tbody> */