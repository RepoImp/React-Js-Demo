export function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


export const pickColor = (color_picker, color_picker_wrapper) => {
  color_picker.onChange = function () {
    color_picker_wrapper.style.backgroundColor = color_picker.value;
  };
  color_picker_wrapper.style.backgroundColor = color_picker.value;
};

export const handleRequestSort = (
  event,
  property,
  setOrder,
  setOrderBy,
  order,
  orderBy
) => {
  const isAsc = orderBy === property && order === "asc";
  setOrder(isAsc ? "desc" : "asc");
  setOrderBy(property);
};

export const handleSelectAllClick = (event, rows, setSelected) => {
  if (event.target.checked) {
    const newSelecteds = rows.map((n) => n.id);

    setSelected(newSelecteds);
    return;
  }
  setSelected([]);
};

export const handleClick = (event, name, selected, setSelected) => {
  const selectedIndex = selected.indexOf(name);
  let newSelected = [] 

  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selected, name);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selected.slice(1));
  } else if (selectedIndex === selected.length - 1) {
    newSelected = newSelected.concat(selected.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      selected.slice(0, selectedIndex),
      selected.slice(selectedIndex + 1)
    );
  }

  setSelected(newSelected);
};

export const handleChangePage = (event, newPage, setPage) => {
  setPage(newPage);
};

export const handleChangeRowsPerPage = (event, setRowsPerPag, setPage) => {
  setRowsPerPag(parseInt(event.target.value, 10));
  setPage(0);
};

export const isSelected = (name, selected) => selected.indexOf(name) !== -1;

export const emptyRows = (page, rowsPerPage, rows) => {
  return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
};
/********** UPLOAD IMAGE FUNCTIONS START *********/
const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export async function handleChangeImage(e, setLoader, setImage, imageUpload) {
  setLoader(true);
  setImage(URL.createObjectURL(e.target.files[0]));
  let base64 = [] 
  base64 = await convertBase64(e.target.files[0]);
  base64 = base64.split(",")[1];
  const imageObj = {
    name: e.target.files[0].name,
    contentType: e.target.files[0].type,
    file: base64,
  };
  const data = await imageUpload(imageObj);
  console.log("handleChangeImage logo :::", data);
  setImage(data.url);
  setLoader(false);
}

/********** UPLOAD IMAGE FUNCTIONS END *********/
