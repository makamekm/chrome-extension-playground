function getItems() {
  return [
    {
      label: 'dgdgf',
      children: [
        {
          label: 'dgdgf',
          children: [
            {
              label: 'dgdgf',
            },
            {
              label: 'rewrwer',
            },
          ],
        },
        {
          label: 'dgdgf',
          children: [
            {
              label: 'dgdgf',
            },
            {
              label: 'rewrwer',
            },
          ],
        },
      ]
    },
    {
      label: 'gjjhg',
      children: [
        {
          label: 'dgdgf',
          children: [
            {
              label: 'dgdgf',
            },
            {
              label: 'rewrwer',
            },
          ],
        },
        {
          label: 'dgdgf',
          children: [
            {
              label: 'dgdgf',
            },
            {
              label: 'rewrwer',
            },
          ],
        },
      ]
    },
  ];
}

function getIndex(index, subIndex) {
  let result = 0;
  const items = getItems();
  for (let i = 0; i < items.length; i++) {
    for (let k = 0; k < items[i].children.length; k++) {
      if (i === index && subIndex === k) {
        return result;
      }
      result++;
    }
  }
  return -1;
};

function getFlatItems() {
  return getItems().reduce((acc, topItem, index) => {
    topItem.children.forEach((item, subIndex) => {
      acc = acc.concat(item.children);
    });
    return acc;
  }, []);
}