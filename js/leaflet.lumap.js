(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || lm, global.Lumap = factory());
}(this, (function () { 'use strict';

    function Lumap(_map,_el,_l)
    {
        let lm = this;
        let _html =``;
        let _idAside;
        let _layers = new Map();
        let _generated = false;
        let _layersGroup = '';

        this.reinit = function() 
        {
            _generated = false;
            _el.innerHTML = '';
            lm.init();
        }

        lm.init = function()
        {
            _idAside  = `lumap-${lm.makeId(5)}`;
            _el.innerHTML = lm.generate();
            lm.onchange();
            lm.onchangeParent();
            _generated = true;
        }   

        lm.generate = function() 
        {
            let _i;
            _html =`<div class="accordion lumap-aside" id="${_idAside}">`;
            if(_el==null)
            {
                console.error('Selector is null')
            }

            for(_i in _l)
            {
                _html += lm.genBody(_l[_i]);
            }
            _html += `</div>`;
            return _html;
        }

        lm.eachLayersRemove = function(v,k,m)
        {
            if(v.group.id==_layersGroup)
            {
                _map.removeLayer(v.layer);
            }
        }

        lm.onchange = function()
        {
            if(!_generated)
            {
                let _els = _el.querySelectorAll('.lm-click-layer');
                for(let _elChange of _els)
                {
                    _elChange.addEventListener('change',(e)=>{
                        let _getId = e.target.value;
                        let _chckd = _el.querySelector(`input[id="${_getId}"]`).checked;
                        let _getLayer = _layers.get(_getId);
                        if(_getLayer.group.type=='single')
                        {
                            _layersGroup = _getLayer.group.id;
                            _layers.forEach(lm.eachLayersRemove);
                        }
                        if(_chckd)
                        {
                            _getLayer.layer.addTo(_map);
                        }
                        else
                        {
                             _map.removeLayer(_getLayer.layer);
                        }

                    });
                }
            }
        }

        lm.onchangeParent = function()
        {
            if(!_generated)
            {
                let _elParents = _el.querySelectorAll('.lm-click-parent');
                for(let _elParent of _elParents)
                {
                    let _getParent = _elParent.value;
                    let _elChilds = _el.querySelectorAll(`input[data-parent="${_getParent}"]`);
                    let _childChecked = true;
                    for(let _elChild of _elChilds)
                    {
                        if(_childChecked)
                        {
                            if(!_elChild.checked)
                            {
                                _childChecked = false;
                                continue;
                            }
                        }
                    }

                    _elParent.checked = _childChecked;

                    _elParent.addEventListener('change',(e)=>{
                        let _chckd = e.target.checked;
                        for(let _elChild of _elChilds)
                        {
                            if(_chckd)
                            {
                                _elChild.checked  = true;
                            }
                            else
                            {
                                _elChild.checked = false;
                            }
                            _elChild.dispatchEvent(new Event('change'));
                        }
                    });
                }
            }
        }

        lm.genBody = function(_d)
        {
            let _h = ``;
            let _setId = `${_d.id}`;
            let _setTitle = _d.title;
             _h += `<div class="accordion-item">
                    <h2 class="accordion-header d-flex gap-2 align-items-center" id="headingOne">
                        <input class="form-check-input lm-click-parent" type="checkbox" value="${_setId}">
                      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#header-${_setId}" aria-expanded="true" aria-controls="collapseOne">
                        ${_setTitle}
                     </button>
                    </h2>
                    <div id="header-${_setId}" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#${_idAside}">
                      <div class="accordion-body">`;
            let _i;
            let _c = 0;
            for(_i in _d.child)
            {
                // calculate total checkd default
                let _setIdChild = `${_d.id}${_i}`;
                let _c = _d.child[_i];
                lm.genLayers(_setIdChild,_c.layer,_d);
                let _setType = 'checkbox';
                let _checked = '';
                if(_map.hasLayer(_c.layer))
                {
                    _checked = 'checked';
                }
                if(_d.type=='single')
                {
                    _setType = 'radio';
                }
                _h += `<div class="form-check d-flex align-items-center justify-content-between gap-2">
                            <div class="d-flex align-items-center gap-1">
                              ${lm.setIcon(_c)}
                              <label class="form-check-label" for="${_setIdChild}">
                                ${_c.title}
                              </label>
                            </div>
                          <input class="form-check-input lm-click-layer" data-parent="${_setId}" name="${_setId}" ${_checked} type="${_setType}" value="${_setIdChild}" id="${_setIdChild}">
                        </div>`;

            }
            _h += `</div>
                    </div>
                  </div>`;
            return _h;
        }

        lm.setStyle = function(_d) {
            if(_d.style!=undefined)
            {
                return ` style="${_d.style}" `
            }
            return '';
        }

        lm.setIcon = function(_d) {
            if(_d.icon!=undefined || _d.iconHtml!=undefined)
            {
                let _h = ``;
                if(_d.iconHtml!=undefined)
                {
                    _h += `<div class="lm-icon lm-icon-image" ${lm.setStyle(_d)}>`;
                    _h += _d.iconHtml;
                }
                else
                {
                    _h += `<div class="lm-icon" ${lm.setStyle(_d)}>`;
                    _h += `<span class="bi bi-${_d.icon}"></span>`;
                }
                _h += `</div>`;
                return _h;
            }
            return '';
        }

        lm.genLayers = function(_setId,_l,_d)
        {
            if(!_layers.has(_setId))
            {
                _layers.set(_setId,{layer:_l,group:_d});
            }
        }

        lm.makeId = function (_length){
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < _length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }

        lm.init();
    };
    return Lumap;
})));