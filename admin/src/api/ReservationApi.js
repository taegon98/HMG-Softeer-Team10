import axios from './Settings'

export async function getReservationList ({
  shopName,
  startPickUpDateTime,
  endPickUpDateTime,
  startReturnDateTime,
  endReturnDateTime,
  customerName,
  sellName,
  stage,
  sortColumn,
  sortDirection,
  page = 1,
  size = 10
}) {
  try {
    const response = await axios.get('/v2/admin/reservation/all', {
      params: {
        shopName: shopName,
        startPickUpDateTime: startPickUpDateTime,
        endPickUpDateTime: endPickUpDateTime,
        startReturnDateTime: startReturnDateTime,
        endReturnDateTime: endReturnDateTime,
        customerName: customerName,
        sellName: sellName,
        stage: stage,
        sortColumn: sortColumn,
        sortDirection: sortDirection,
        page: page,
        size: size
      }
    })

    return response
  } catch (error) {
    console.error(error)
  }
}

export async function getReservationDetail (reservationId) {
  try {
    const response = await axios.get(
      `/v1/reservation/${reservationId}/detail`,
      {}
    )

    return response.data.data
  } catch (error) {
    console.error(error)
  }
}

export async function postProgress (reservationId, progress, detail) {
  try {
    const response = await axios.post(`/v2/admin/reservation/progress`, {
      reservationId: reservationId,
      progress: progress,
      detail: detail
    })

    return response.data.data
  } catch (error) {
    console.error(error)
  }
}

export async function deleteProgress (stepId) {
  try {
    const response = await axios.delete(
      `/v2/admin/reservation/progress/${stepId}`
    )

    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function postMaintenanceImage (reservationId, status, image) {
  try {
    const formData = new FormData()
    formData.append('status', status)
    formData.append('image', image)

    const response = await axios.post(
      `/v2/admin/reservation/${reservationId}/image`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    return response.data.data
  } catch (error) {
    console.error(error)
  }
}

export async function deleteMaintenanceImage (imageId) {
  try {
    const response = await axios.delete(
      `/v2/admin/reservation/image/${imageId}`
    )

    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function checkReservation (shopName, businessDay) {
  try {
    const response = await axios.get(`/v2/admin/reservation/check`, {
      params: {
        shopName: shopName,
        businessDay: businessDay
      }
    })

    return response.data.data
  } catch (error) {
    console.error(error)
  }
}
