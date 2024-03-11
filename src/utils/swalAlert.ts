import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// const MySwal = withReactContent(Swal);

export function alertMessage({
  title,
  text,
  icon,
  showConfirmButton,
  timer,
} : any) {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    timer: timer || 2500,
    timerProgressBar: true,
    showConfirmButton: showConfirmButton,
  });
}

export default alertMessage;
