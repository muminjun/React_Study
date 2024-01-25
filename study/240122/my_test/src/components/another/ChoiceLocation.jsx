import React, {useEffect, useState} from "react";
import axios from "axios";

function ChoiceLocation () {
  const openWeatherApiKey = '87246d75e1ce26e1392a087b3d1d88c5'
  const [lat, setLat] = useState('')
  const [lon, setLon] = useState('')

  const [selectProvince, setSelectProvince] = useState('')
  const [districts, setDistricts] = useState([])
  const [selectedDistrict , setSelectedDistrict ] = useState('')

  const provinces = ['서울특별시', '부산광역시', '대구광역시', '인천광역시', '광주광역시', '대전광역시', '울산광역시', '경기도', '강원도', '충청북도', '충청남도', '전라북도', '전라남도', '경상북도', '경상남도', '제주도'];
  const getDistrictsByProvince = (province) => {
    switch (province) {
      case '서울특별시':
        return ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'];
      case '부산광역시':
        return ['강서구', '금정구', '기장군', '남구', '동구', '동래구', '부산진구', '북구', '사상구', '사하구', '서구', '수영구', '연제구', '영도구', '중구', '해운대구'];
      case '대구광역시':
        return ['남구', '달서구', '달성군', '동구', '북구', '서구', '수성구', '중구'];
      case '인천광역시':
        return ['강화군', '계양구', '남동구', '동구', '미추홀구', '부평구', '서구', '연수구', '옹진군', '중구'];
      case '광주광역시':
        return ['광산구', '남구', '동구', '북구', '서구'];
      case '대전광역시':
        return ['대덕구', '동구', '서구', '유성구', '중구'];
      case '울산광역시':
        return ['남구', '동구', '북구', '울주군', '중구'];
      case '경기도':
        return ['가평군', '고양시', '과천시', '광명시', '광주시', '구리시', '군포시', '김포시', '남양주시', '동두천시', '부천시', '성남시', '수원시', '시흥시', '안산시', '안성시', '안양시', '양주시', '양평군', '여주시', '연천군', '오산시', '용인시', '의왕시', '의정부시', '이천시', '파주시', '평택시', '포천시', '하남시', '화성시'];
      case '강원도':
        return ['강릉시', '고성군', '동해시', '삼척시', '속초시', '양구군', '양양군', '영월군', '원주시', '인제군', '정선군', '철원군', '춘천시', '태백시', '평창군', '홍천군', '화천군', '횡성군'];
      case '충청북도':
        return ['괴산군', '단양군', '보은군', '영동군', '옥천군', '음성군', '제천시', '진천군', '청주시', '충주시'];
      case '충청남도':
        return ['계룡시', '공주시', '금산군', '논산시', '당진시', '보령시', '부여군', '서산시', '서천군', '아산시', '예산군', '천안시', '청양군', '태안군', '홍성군'];
      case '전라북도':
        return ['고창군', '군산시', '김제시', '남원시', '무주군', '부안군', '순창군', '완주군', '익산시', '임실군', '장수군', '전주시', '정읍시', '진안군'];
      case '전라남도':
        return ['강진군', '고흥군', '곡성군', '광양시', '구례군', '나주시', '담양군', '목포시', '무안군', '보성군', '순천시', '신안군', '여수시', '영광군', '영암군', '완도군', '장성군', '장흥군', '진도군', '함평군', '해남군', '화순군'];
      case '경상북도':
        return ['경산시', '경주시', '고령군', '구미시', '군위군', '김천시', '문경시', '봉화군', '상주시', '성주군', '안동시', '영덕군', '영양군', '영주시', '영천시', '예천군', '울릉군', '울진군', '의성군', '청도군', '청송군', '칠곡군', '포항시'];
      case '경상남도':
        return ['거제시', '거창군', '고성군', '김해시', '남해군', '밀양시', '사천시', '산청군', '양산시', '의령군', '진주시', '창녕군', '창원시', '통영시', '하동군', '함안군', '함양군', '합천군'];
      case '제주도':
        return ['서귀포시', '제주시'];
      default:
        return [];
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLat(pos.coords.latitude)
      setLon(pos.coords.longitude)
    })
  }, [])

  // 날씨 위젯
  const openWeather = async (lat, lon) => {
    try{
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}&units=metric&lang=kr`)
      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const provinceChange = (e) => {
    const selectedProvince = e.target.value;
    setSelectProvince(selectedProvince);

    if (selectedProvince) {
      const districtsForProvince = getDistrictsByProvince(selectedProvince);
      setDistricts(districtsForProvince);
      setSelectedDistrict('');
    } else {
      setDistricts([]);
      setSelectedDistrict('');
    }
  };

  const districtChange = (e) => {
    setSelectedDistrict(e.target.value)
  }

  return (
    <>
      <div>
        <select name="provinceSelect" id="provinceSelect" value={selectProvince} onChange={provinceChange}>
          <option value="">지역을 선택하세요.</option>
          {provinces.map((province, index) => (
            <option value={province} key={index}>
              {province}
            </option>
          ))}
        </select>

        <select name="districtSelect" id="districtSelect" value={selectedDistrict} onChange={districtChange}>
          <option value="">시/구/군을 선택하세요</option>
          {districts.map((district, index) => (
            <option value={district} key={index}>
              {district}
            </option>
          ))}
        </select>
        <div>
          {selectProvince}
          {selectedDistrict}
        </div>
        <div>
          <div>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default ChoiceLocation